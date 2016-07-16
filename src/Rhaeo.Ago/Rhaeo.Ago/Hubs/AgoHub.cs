using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Rhaeo.Ago.Models;

namespace Rhaeo.Ago.Hubs
{
    [Authorize]
    public sealed class AgoHub : Hub
    {
        // Fields:

        private static readonly ConcurrentDictionary<string, string> ConnectionIdToUserName =
            new ConcurrentDictionary<string, string>();

        private static readonly List<Guid> ItemsInOrder = new List<Guid>();

        private static readonly ConcurrentDictionary<Guid, Item> ItemsById =
            new ConcurrentDictionary<Guid, Item>();

        // Methods:

        public override Task OnConnected()
        {
            Trace.WriteLine($"OnConnected {Context.ConnectionId}.");
            if (!ConnectionIdToUserName.TryAdd(Context.ConnectionId, Context.User.Identity.Name))
            {
                Trace.WriteLine($"OnConnected: {Context.ConnectionId} {Context.User.Identity.Name} already in list.");
            }

            Sync();

            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            Trace.WriteLine($"OnReconnected {Context.ConnectionId}.");
            if (ConnectionIdToUserName.ContainsKey(Context.ConnectionId))
            {
                return base.OnReconnected();
            }

            Trace.WriteLine($"OnReconnected: {Context.ConnectionId} not in list.");
            if (!ConnectionIdToUserName.TryAdd(Context.ConnectionId, Context.User.Identity.Name))
            {
                Trace.WriteLine($"OnConnected: {Context.ConnectionId} {Context.User.Identity.Name} already in list.");
            }

            return base.OnReconnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Trace.WriteLine($"OnDisconnected {Context.ConnectionId} {stopCalled}.");
            string userName;
            if (!ConnectionIdToUserName.TryRemove(Context.ConnectionId, out userName))
            {
                Trace.WriteLine(
                    $"OnDisconnected: {Context.ConnectionId} {Context.User.Identity.Name} {userName} can't remove.");
            }

            return base.OnDisconnected(stopCalled);
        }

        private void Sync()
        {
            if (!ItemsInOrder.Any())
            {
                Clients.Caller.sync(new object[] { });
                return;
            }

            lock (ItemsInOrder)
            {
                Clients.Caller.sync(ItemsInOrder.Select((id, index) => new
                {
                    PrevId = ItemsInOrder[index == 0 ? ItemsInOrder.Count - 1 : index - 1],
                    NextId = ItemsInOrder[index == ItemsInOrder.Count - 1 ? 0 : index + 1],
                    Item = ItemsById[id]
                }));
            }
        }

        // Actions:

        // [Authorize]
        public double Ping(double payload)
        {
            Clients.Caller.pong(payload);
            return payload;
        }

        public void CreateNewTask(ItemNewModel item)
        {
            var id = Guid.NewGuid();
            ItemsInOrder.Insert(0, id);
            ItemsById.TryAdd(id, new Item(id) { Cyphertext = item.Cyphertext, Salt = item.Salt, IV = item.IV });
            Sync();
        }

        public void MarkTask(Guid id)
        {
            ItemsById[id].IsMarked = true;
            Sync();
        }

        public void RemoveTask(Guid id)
        {
            Item item;
            ItemsInOrder.Remove(id);
            ItemsById.TryRemove(id, out item);
            Sync();
        }

        public void SwapTasks(Guid id1, Guid id2)
        {
            lock (ItemsInOrder)
            {
                var oldIndex = ItemsInOrder.IndexOf(id1);
                var newIndex = ItemsInOrder.IndexOf(id2);
                var temp = ItemsInOrder[oldIndex];
                ItemsInOrder[oldIndex] = ItemsInOrder[newIndex];
                ItemsInOrder[newIndex] = temp;
            }

            Sync();
        }
    }
}

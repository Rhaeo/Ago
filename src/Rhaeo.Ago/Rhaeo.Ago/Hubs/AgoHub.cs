using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Rhaeo.Ago.Models;
using Rhaeo.Ago.Repositories;

namespace Rhaeo.Ago.Hubs
{
    [Authorize]
    public sealed class AgoHub : Hub
    {
        // Fields:

        private static readonly ConcurrentDictionary<string, string> ConnectionIdToUserName =
            new ConcurrentDictionary<string, string>();

        private readonly IRepository Repository = new BinarySerializedRepository();

        // Constructors:

        public AgoHub()
        {
            Repository.Reloaded += Repository_Reloaded;
        }

        private void Repository_Reloaded(object sender, EventArgs e)
        {
            Trace.WriteLine("Reloaded");
            Sync();
        }

        // Methods:

        protected override void Dispose(bool disposing)
        {
            Repository.Reloaded -= Repository_Reloaded;
            Repository.Dispose();
            base.Dispose(disposing);
        }

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
            var itemsInOrder = Repository.GetItemIdsInOrder();
            if (!itemsInOrder.Any())
            {
                Clients.Caller.sync(new object[] { });
                return;
            }

            lock (Repository)
            {
                Clients.Caller.sync(itemsInOrder.Select((id, index) => new Link()
                {
                    PrevId = itemsInOrder[index == 0 ? itemsInOrder.Length - 1 : index - 1],
                    NextId = itemsInOrder[index == itemsInOrder.Length - 1 ? 0 : index + 1],
                    Item = Repository.GetItemById(id)
                }));
            }
        }

        // Actions:

        public double Ping(double payload)
        {
            Clients.Caller.pong(payload);
            return payload;
        }

        public void CreateNewTask(ItemNewModel item)
        {
            var id = Guid.NewGuid();
            Repository.AddItem(id, item.Cyphertext, item.Salt, item.IV);
            Sync();
        }

        public void MarkTask(Guid id)
        {
            Repository.MarkItem(id);
            Sync();
        }

        public void RemoveTask(Guid id)
        {
            Repository.RemoveItem(id);
            Sync();
        }

        public void SwapTasks(Guid id1, Guid id2)
        {
            lock (Repository)
            {
                Repository.SwapItemsByIds(id1, id2);
            }

            Sync();
        }
    }
}

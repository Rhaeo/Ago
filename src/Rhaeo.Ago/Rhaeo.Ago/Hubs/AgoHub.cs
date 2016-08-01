using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Rhaeo.Ago.Models;
using Rhaeo.Ago.Repositories;

namespace Rhaeo.Ago.Hubs
{
    [Authorize]
    // ReSharper disable once ClassNeverInstantiated.Global
    public sealed class AgoHub : Hub<IAgoHubClient>, IAgoHubServer
    {
        // Fields:

        private static readonly ConcurrentDictionary<string, string> ConnectionIdToUserName =
            new ConcurrentDictionary<string, string>();

        private readonly IRepository _repository = new BinarySerializedRepository();

        // Methods:

        public override Task OnConnected()
        {
            Trace.WriteLine($"OnConnected {Context.ConnectionId}.");
            if (!ConnectionIdToUserName.TryAdd(Context.ConnectionId, Context.User.Identity.Name))
            {
                Trace.WriteLine($"OnConnected: {Context.ConnectionId} {Context.User.Identity.Name} already in list.");
            }

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

        // Actions:

        // ReSharper disable once UnusedMember.Global
        public void PersistTask(TaskEditModel task) => _repository.PersistTask();

        // ReSharper disable once UnusedMember.Global
        public void CreateNewTask(string cyphertext, string salt, string iv)
        {
            var id = Guid.NewGuid();
            _repository.AddItem(id, cyphertext, salt, iv);
        }

        // ReSharper disable once UnusedMember.Global
        public void MarkTask(Guid id)
        {
            _repository.MarkItem(id);
        }

        // ReSharper disable once UnusedMember.Global
        public void RemoveTask(Guid id)
        {
            _repository.RemoveItem(id);
        }

        // ReSharper disable once UnusedMember.Global
        public void SwapTasks(Guid id1, Guid id2)
        {
            lock (_repository)
            {
                _repository.SwapItemsByIds(id1, id2);
            }
        }
    }
}

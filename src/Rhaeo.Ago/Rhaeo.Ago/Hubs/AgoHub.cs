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
    // Structs:

    private struct Void
    {
      public static readonly Void Empty = default(Void);
    }

    // Fields:

    private static readonly ConcurrentDictionary<string, string> ConnectionIdToUserName =
      new ConcurrentDictionary<string, string>();

    private static readonly ConcurrentDictionary<string, ConcurrentDictionary<string, Void>> UserNameToConnectionIds =
      new ConcurrentDictionary<string, ConcurrentDictionary<string, Void>>();

    private readonly IRepository _repository = new BinarySerializedRepository();

    // Methods:

    public override Task OnConnected()
    {
      var userName = Context.User.Identity.Name;
      var connectionId = Context.ConnectionId;

      Trace.WriteLine($"OnConnected {connectionId}.");
      if (!ConnectionIdToUserName.TryAdd(connectionId, userName))
      {
        Trace.WriteLine($"OnConnected: {connectionId} {userName} already in list.");
      }

      UserNameToConnectionIds.AddOrUpdate(userName,
        _ =>
        {
          var connectionIds = new ConcurrentDictionary<string, Void>();
          if (!connectionIds.TryAdd(connectionId, Void.Empty))
          {
            Trace.WriteLine($"OnConnected: {connectionId} {userName} already in ID list.");
          }

          return connectionIds;
        },
        (_, connectionIds) =>
      {
        if (!connectionIds.TryAdd(connectionId, Void.Empty))
        {
          Trace.WriteLine($"OnConnected: {connectionId} {userName} already in ID list.");
        }

        return connectionIds;
      });

      return base.OnConnected();
    }

    public override Task OnReconnected()
    {
      var userName = Context.User.Identity.Name;
      var connectionId = Context.ConnectionId;

      Trace.WriteLine($"OnReconnected {connectionId}.");
      if (ConnectionIdToUserName.ContainsKey(connectionId))
      {
        return base.OnReconnected();
      }

      Trace.WriteLine($"OnReconnected: {connectionId} not in list.");
      if (!ConnectionIdToUserName.TryAdd(connectionId, userName))
      {
        Trace.WriteLine($"OnReconnected: {connectionId} {userName} already in list.");
      }

      UserNameToConnectionIds.AddOrUpdate(userName,
        _ =>
        {
          var connectionIds = new ConcurrentDictionary<string, Void>();
          if (!connectionIds.TryAdd(connectionId, Void.Empty))
          {
            Trace.WriteLine($"OnReconnected: {connectionId} {userName} already in ID list.");
          }

          return connectionIds;
        },
        (_, connectionIds) =>
        {
          if (!connectionIds.TryAdd(connectionId, Void.Empty))
          {
            Trace.WriteLine($"OnReconnected: {connectionId} {userName} already in ID list.");
          }

          return connectionIds;
        });

      return base.OnReconnected();
    }

    public override Task OnDisconnected(bool stopCalled)
    {
      string userName;
      var connectionId = Context.ConnectionId;

      Trace.WriteLine($"OnDisconnected {connectionId} {stopCalled}.");
      if (!ConnectionIdToUserName.TryRemove(connectionId, out userName))
      {
        Trace.WriteLine($"OnDisconnected: {connectionId} {userName} can't remove.");
        return base.OnDisconnected(stopCalled); ;
      }

      Void outGarbage;
      if (!UserNameToConnectionIds[userName].TryRemove(connectionId, out outGarbage))
      {
        Trace.WriteLine($"OnDisconnected: {connectionId} {userName} cannot remove from the ID list.");
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

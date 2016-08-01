using System;
using Rhaeo.Ago.Models;

namespace Rhaeo.Ago.Repositories
{
    public interface IRepository : IDisposable
    {
        event EventHandler Reloaded;
        Guid[] GetItemIdsInOrder();
        Item GetItemById(Guid id);
        void AddItem(Guid id, string cyphertext, string salt, string iV);
        void MarkItem(Guid id);
        void RemoveItem(Guid id);
        void SwapItemsByIds(Guid id1, Guid id2);
        void Reload();
        void PersistTask();

        // Tasks:
        void CreateNewTask(string text);
    }
}

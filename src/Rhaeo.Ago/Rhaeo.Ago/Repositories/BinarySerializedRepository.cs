using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Web.Hosting;
using Rhaeo.Ago.Models;

namespace Rhaeo.Ago.Repositories
{
    public sealed class BinarySerializedRepository : IRepository
    {
        // Events:

        public event EventHandler Reloaded;


        // Fields:

        private static readonly string FilePath = HostingEnvironment.MapPath("~/App_Data/state.bin");

        private readonly FileSystemWatcher _fileSystemWatcher = new FileSystemWatcher();

        private State state;

        // Constructors:

        public BinarySerializedRepository()
        {
            Reload();
            _fileSystemWatcher.Path = HostingEnvironment.MapPath("~/App_Data");
            _fileSystemWatcher.Filter = Path.GetFileName(FilePath);
            _fileSystemWatcher.EnableRaisingEvents = true;
            _fileSystemWatcher.Created += FileSystemWatcher_Created;
            _fileSystemWatcher.Changed += _fileSystemWatcher_Changed;
            _fileSystemWatcher.Deleted += _fileSystemWatcher_Deleted;
        }

        private void _fileSystemWatcher_Deleted(object sender, FileSystemEventArgs e)
        {
            Trace.WriteLine("Deleted");
            Reload();
        }

        private void _fileSystemWatcher_Changed(object sender, FileSystemEventArgs e)
        {
            Trace.WriteLine("Changed");
            Reload();
        }

        private void FileSystemWatcher_Created(object sender, FileSystemEventArgs e)
        {
            Trace.WriteLine("Created");
            Reload();
        }

        public void Dispose()
        {
            _fileSystemWatcher.Created -= FileSystemWatcher_Created;
            _fileSystemWatcher.Changed -= _fileSystemWatcher_Changed;
            _fileSystemWatcher.Deleted -= _fileSystemWatcher_Deleted;
            _fileSystemWatcher.Dispose();
        }

        // Classes:

        [Serializable]
        private sealed class State
        {
            public readonly List<Guid> ItemsInOrder = new List<Guid>();

            public readonly ConcurrentDictionary<Guid, Item> ItemsById =
                new ConcurrentDictionary<Guid, Item>();

            public readonly List<Exception> Errors = new List<Exception>();

            public readonly ConcurrentDictionary<Guid, string> Tags =
                new ConcurrentDictionary<Guid, string>();


        }

        // Methods:

        private void Commit()
        {
            _fileSystemWatcher.EnableRaisingEvents = false;
            using (var fileStream = new FileStream(FilePath, FileMode.Create, FileAccess.Write))
            {
                new BinaryFormatter().Serialize(fileStream, state);
            }

            _fileSystemWatcher.EnableRaisingEvents = true;
        }

        public void Reload()
        {
            if (File.Exists(FilePath))
            {
                try
                {
                    using (var fileStream = new FileStream(FilePath, FileMode.Open, FileAccess.Read))
                    {
                        state = new BinaryFormatter().Deserialize(fileStream) as State;
                    }
                }
                catch (Exception exception)
                {
                    state = new State();
                    state.Errors.Add(exception);
                }
            }
            else
            {
                state = new State();
            }

            Reloaded?.Invoke(this, EventArgs.Empty);
        }

        public void PersistTask()
        {
            throw new NotImplementedException();
        }

        public Guid[] GetItemIdsInOrder()
        {
            return state.ItemsInOrder.ToArray();
        }

        public Item GetItemById(Guid id)
        {
            return state.ItemsById[id];
        }

        public void AddItem(Guid id, string cyphertext, string salt, string iv)
        {
            state.ItemsInOrder.Insert(0, id);
            state.ItemsById.TryAdd(id, new Item(id) { Cyphertext = cyphertext, Salt = salt, IV = iv });
            Commit();
        }

        public void MarkItem(Guid id)
        {
            state.ItemsById[id].IsMarked = true;
            Commit();
        }

        public void RemoveItem(Guid id)
        {
            Item item;
            state.ItemsInOrder.Remove(id);
            state.ItemsById.TryRemove(id, out item);
            Commit();
        }

        public void SwapItemsByIds(Guid id1, Guid id2)
        {
            var oldIndex = state.ItemsInOrder.IndexOf(id1);
            var newIndex = state.ItemsInOrder.IndexOf(id2);
            var temp = state.ItemsInOrder[oldIndex];
            state.ItemsInOrder[oldIndex] = state.ItemsInOrder[newIndex];
            state.ItemsInOrder[newIndex] = temp;
            Commit();
        }

        //

        public void CreateNewTask(string text)
        {
            throw new NotImplementedException();
        }
    }
}

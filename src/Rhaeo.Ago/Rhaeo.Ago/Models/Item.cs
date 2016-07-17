using System;

namespace Rhaeo.Ago.Models
{
    [Serializable]
    public sealed class Item
    {
        // Constructors:

        public Item(Guid id)
        {
            Id = id;
        }

        // Properties:

        public Guid Id { get; }

        public string Cyphertext { get; set; }

        public string Salt { get; set; }

        public string IV { get; set; }

        public bool IsMarked { get; set; }
    }
}

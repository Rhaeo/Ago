using System;

namespace Rhaeo.Ago.Models
{
    public sealed class Link
    {
        public Item Item { get; set; }
        public Guid NextId { get; set; }
        public Guid PrevId { get; set; }
    }
}

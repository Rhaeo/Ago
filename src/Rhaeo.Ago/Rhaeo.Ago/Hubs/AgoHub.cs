using Microsoft.AspNet.SignalR;

namespace Rhaeo.Ago.Hubs
{
    public sealed class AgoHub : Hub
    {
        // [Authorize]
        public double Ping(double payload)
        {
            Clients.Caller.pong(payload);
            return payload;
        }
    }
}

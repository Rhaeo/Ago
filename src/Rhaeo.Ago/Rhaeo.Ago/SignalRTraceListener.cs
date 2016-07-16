using System.Diagnostics;
using Microsoft.AspNet.SignalR;
using Rhaeo.Ago.Hubs;

namespace Rhaeo.Ago
{
    public sealed class SignalRTraceListener : TextWriterTraceListener
    {
        public override void Write(string message)
        {
            GlobalHost.ConnectionManager.GetHubContext<AgoHub>().Clients.All.trace(message);
        }

        public override void WriteLine(string message)
        {
            GlobalHost.ConnectionManager.GetHubContext<AgoHub>().Clients.All.trace(message);
        }
    }
}

using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Newtonsoft.Json;
using Owin;

[assembly: OwinStartupAttribute(typeof(Rhaeo.Ago.Startup))]
namespace Rhaeo.Ago
{
    public partial class Startup
    {
        // ReSharper disable once UnusedMember.Global
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();

            var jsonSerializer = new JsonSerializer() {ContractResolver = new SignalRContractResolver()};
            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => jsonSerializer);
        }
    }
}

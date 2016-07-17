using System.IO;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Rhaeo.Ago
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // Create App_Data in case empty App_Data hasn't got deployed.
            if (!Directory.Exists(Server.MapPath("~/App_Data")))
            {
                Directory.CreateDirectory(Server.MapPath("~/App_Data"));
            }
        }
    }
}

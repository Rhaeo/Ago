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
            GlobalFilters.Filters.Add(new HandleErrorAttribute());

            RouteTable.Routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            RouteTable.Routes.MapRoute("Default", "{controller}/{action}/{id}", new { controller = "Ago", action = "Index", id = UrlParameter.Optional });

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/Libraries/jquery-{version}.js"));
            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include("~/Scripts/Libraries/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/Libraries/modernizr-*"));
            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include("~/Scripts/Libraries/bootstrap.js", "~/Scripts/Libraries/respond.js"));
            BundleTable.Bundles.Add(new StyleBundle("~/Content/css").Include("~/Styles/bootstrap.css", "~/Styles/site.css"));

            // Create App_Data in case empty App_Data hasn't got deployed.
            if (!Directory.Exists(Server.MapPath("~/App_Data")))
            {
                Directory.CreateDirectory(Server.MapPath("~/App_Data"));
            }
        }
    }
}

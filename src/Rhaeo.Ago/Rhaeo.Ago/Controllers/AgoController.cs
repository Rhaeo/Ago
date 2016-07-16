using System.Web.Mvc;

namespace Rhaeo.Ago.Controllers
{
    [Authorize]
    public class AgoController : Controller
    {
        // GET: Ago
        public ActionResult Index()
        {
            return View();
        }
    }
}

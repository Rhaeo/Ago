using System;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace Rhaeo.Ago.Controllers
{
    [System.Web.Mvc.Authorize]
    public class AgoController : Controller
    {
        // GET: Ago
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Export()
        {
            return File("~/App_Data/state.bin", "application/octet-stream", $"Ago-{DateTimeOffset.Now.ToString("o").Replace(":", "-")}.bin");
        }

        [HttpPost]
        public ActionResult Import(HttpPostedFileBase file)
        {
            if (file.ContentLength > 0 && Path.GetExtension(file.FileName)?.ToUpperInvariant() == ".BIN")
            {
                file.SaveAs(Server.MapPath("~/App_Data/state.bin"));
            }

            return RedirectToAction(nameof(Index));
        }
    }
}

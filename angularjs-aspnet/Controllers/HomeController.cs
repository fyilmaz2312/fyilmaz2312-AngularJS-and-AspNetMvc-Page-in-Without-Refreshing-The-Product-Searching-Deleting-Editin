using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using angularjs_aspnet.Models;

namespace angularjs_aspnet.Controllers
{
    public class HomeController : Controller
    {
        private ProjectEntities db = new ProjectEntities();
        SqlConnection con = new SqlConnection(Properties.Settings.Default.connString);

        public ActionResult Index()
        {
            return View(db.Product.ToList());
        }

        [HttpGet]
        public JsonResult Veriler()
        {
            using (ProjectEntities dbContext = new ProjectEntities())
            {
                var _listSites = dbContext.Product.ToList();

                return Json(_listSites, JsonRequestBehavior.AllowGet);
            }
        }

        // Delete record

        public void DelSites(int[] deletedSites)
        {
            using (ProjectEntities dbContext = new ProjectEntities())
            {
                dbContext.Product.RemoveRange(dbContext.Product.Where(si => deletedSites.Contains(si.p_id)));
                dbContext.SaveChanges();
            }
        }

        public JsonResult SaveSites(string p_name, string k_name, double p_price, int kdv, int stok)
        {
            try
            {
                using (ProjectEntities dbContext = new ProjectEntities())
                {
                    dbContext.insertProduct(p_name, k_name, p_price, kdv, stok);
                    dbContext.SaveChanges();
                }
                return Veriler();
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public JsonResult UpdateSite(string p_name, string k_name, double p_price, int kdv, int stok, int p_id)
        {
            try
            {
                using (ProjectEntities dbContext = new ProjectEntities())
                {
                    dbContext.updateProduct(p_name, k_name, p_price, kdv, stok, p_id);
                    dbContext.SaveChanges();
                }
                return Veriler();
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}
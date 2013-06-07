using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Learner.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Quizzer()
        {
            return View(new QuizzerViewModel());
        }

        public ActionResult Game(int gameId)
        {
            return View(new GameViewModel() { GameId = gameId });
        }

        public ActionResult Games()
        {
            return View();
        }

        public ActionResult StackOverflow()
        {
            return View();
        }
    }

    public class QuizzerViewModel
    {
    }

    public class GameViewModel
    {
        public int GameId { get; set; }
    }
}

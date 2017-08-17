using DotNetCore_React.Application.NewsApp;
using DotNetCore_React.Application.NewsApp.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCore_React.Controllers
{
    /// <summary>
    /// 角色
    /// </summary>
    [Route("api/[controller]")]
    public class NewsController : AuthorizedController
    {
        private readonly INewsAppService _service;

        public NewsController(INewsAppService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]

        public ActionResult Get_News(string id)
        {
            var myJson = _service.GetSingle(id);
            return Json(myJson);
        }


        [HttpGet("[action]")]

        public ActionResult News_View()
        {
            var myJson = _service.GetAll();
            return Json(myJson);
        }


        [HttpPost("[action]")]

        public ActionResult Create([FromBody] NewsDto news)
        {
            //登記操作者
            news.CreateUser = _currentUser.UserName;
            news.UpdateUser = _currentUser.UserName;

            //
            var myJson = _service.Create(news);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] NewsDto news)
        {
            //登記操作者
            news.UpdateUser = _currentUser.UserName;

            var myJson = _service.Update(news);
            return Json(myJson);
        }


        [HttpPost("[action]/{id}")]

        public ActionResult Delete(string id)
        {
            var myJson = _service.Delete(id);
            
            return Json(myJson);
        }
    }
}

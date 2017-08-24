using DotNetCore_React.Application.LocationApp;
using DotNetCore_React.Application.LocationApp.Dtos;
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
    public class LocationController : AuthorizedController
    {
        private readonly ILocationAppService _service;

        public LocationController(ILocationAppService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]

        public ActionResult Get_Location(string id)
        {
            var myJson = _service.GetSingle(id);
            return Json(myJson);
        }


        [HttpGet("[action]")]

        public ActionResult Location_View()
        {
            var myJson = _service.GetAll();
            return Json(myJson);
        }


        [HttpPost("[action]")]

        public ActionResult Create([FromBody] LocationDto news)
        {
            //登記操作者
            news.CreateUser = _currentUser.UserName;
            news.UpdateUser = _currentUser.UserName;

            //
            var myJson = _service.Create(news);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] LocationDto news)
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

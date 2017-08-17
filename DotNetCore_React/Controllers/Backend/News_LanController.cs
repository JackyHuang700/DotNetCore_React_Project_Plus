using DotNetCore_React.Application.News_LanApp;
using DotNetCore_React.Application.News_LanApp.Dtos;
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
    public class News_LanController : AuthorizedController
    {
        private readonly INews_LanAppService _service;

        public News_LanController(INews_LanAppService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]

        public ActionResult Get_News_Lan(string id)
        {
            var myJson = _service.GetSingle(id);
            return Json(myJson);
        }


        [HttpGet("[action]")]

        public ActionResult News_Lan_View()
        {
            var myJson = _service.GetAll();
            return Json(myJson);
        }


        [HttpPost("[action]")]

        public ActionResult Create([FromBody] News_LanDto news)
        {
            var myJson = _service.Create(news);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] News_LanDto news)
        {
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

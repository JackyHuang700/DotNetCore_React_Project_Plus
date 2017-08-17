using DotNetCore_React.Application.Sys_LanguageApp;
using DotNetCore_React.Application.Sys_LanguageApp.Dtos;
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
    public class Sys_LanguageController : AuthorizedController
    {
        private readonly ISys_LanguageAppService _service;

        public Sys_LanguageController(ISys_LanguageAppService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]

        public ActionResult Get_Sys_Language(int id)
        {
            var myJson = _service.GetSingle(id);
            return Json(myJson);
        }


        [HttpGet("[action]")]

        public ActionResult Sys_Language_View()
        {
            var myJson = _service.GetAll();
            return Json(myJson);
        }


        [HttpPost("[action]")]

        public ActionResult Create([FromBody] Sys_LanguageDto news)
        {
            var myJson = _service.Create(news);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] Sys_LanguageDto news)
        {
            var myJson = _service.Update(news);
            return Json(myJson);
        }


        [HttpPost("[action]/{id}")]

        public ActionResult Delete(int id)
        {
            var myJson = _service.Delete(id);
            return Json(myJson);
        }
    }
}

using DotNetCore_React.Application.LocationApp;
using DotNetCore_React.Application.LocationApp.Dtos;
using Microsoft.AspNetCore.Http;
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

        public ActionResult Create([FromBody] LocationDto viewModel)
        {
            //登記操作者
            viewModel.CreateUser = _currentUser.UserName;
            viewModel.UpdateUser = _currentUser.UserName;

            //
            var myJson = _service.Create(viewModel);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] LocationDto viewModel)
        {
            //登記操作者
            viewModel.UpdateUser = _currentUser.UserName;

            var myJson = _service.Update(viewModel);
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

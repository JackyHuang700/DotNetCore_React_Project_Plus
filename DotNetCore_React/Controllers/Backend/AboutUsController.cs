using DotNetCore_React.Application.AboutUsApp;
using DotNetCore_React.Application.AboutUsApp.Dtos;
using DotNetCore_React.Utility;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCore_React.Controllers.Backend
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]

    public class AboutUsController : AuthorizedController
    {
        private readonly IAboutUsAppService _service;

        public AboutUsController(IAboutUsAppService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]

        public ActionResult GetAboutUs(string id)
        {
            var myJson = _service.GetSingle(id);
            return Json(myJson);
        }


        [HttpGet("[action]")]

        public ActionResult AboutUs_View()
        {
            var myJson = _service.GetAll();
            return Json(myJson);
        }

        [HttpGet("[action]")]

        public ActionResult Category_View()
        {
            var myJson = _service.GetAll_Category();
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Create([FromBody] AboutUsDto viewModel)
        {
            //登記操作者
            viewModel.CreateUser = _currentUser.UserName;
            viewModel.UpdateUser = _currentUser.UserName;

            //
            var myJson = _service.Create(viewModel);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] AboutUsDto viewModel)
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
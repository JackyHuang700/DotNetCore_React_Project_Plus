using DotNetCore_React.Application.ProductApp;
using DotNetCore_React.Application.ProductApp.Dtos;
using DotNetCore_React.Utility;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCore_React.Controllers.Backend
{
    /// <summary>
    /// ?�員
    /// </summary>
        [Route("api/[controller]")]

    public class ProductController : AuthorizedController
    {
           private readonly IProductAppService _service;

        public ProductController(IProductAppService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]

        public ActionResult Get_Product(string id)
        {
            var myJson = _service.GetSingle(id);
            return Json(myJson);
        }


        [HttpGet("[action]")]

        public ActionResult Product_View()
        {
            var myJson = _service.GetAll();
            return Json(myJson);
        }


        [HttpPost("[action]")]

        public ActionResult Create([FromBody] ProductDto viewModel)
        {
            //登記操作者
            viewModel.CreateUser = _currentUser.UserName;
            viewModel.UpdateUser = _currentUser.UserName;

            //
            var myJson = _service.Create(viewModel);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] ProductDto viewModel)
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
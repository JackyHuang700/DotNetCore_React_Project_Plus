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

        public ActionResult Create([FromBody] ProductDto news)
        {
            //登記操作者
            news.CreateUser = _currentUser.UserName;
            news.UpdateUser = _currentUser.UserName;

            //
            var myJson = _service.Create(news);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] ProductDto news)
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
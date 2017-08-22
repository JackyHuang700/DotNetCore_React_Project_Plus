using DotNetCore_React.Application.Product_CategoryApp;
using DotNetCore_React.Application.Product_CategoryApp.Dtos;
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
    public class Product_CategoryController : AuthorizedController
    {
        private readonly IProduct_CategoryService _service;

        public Product_CategoryController(IProduct_CategoryService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]

        public ActionResult Get_Product_Category(int id)
        {
            var myJson = _service.GetSingle(id);
            return Json(myJson);
        }


        [HttpGet("[action]")]

        public ActionResult Product_Category_View()
        {
            var myJson = _service.GetAll();
            return Json(myJson);
        }


        [HttpPost("[action]")]

        public ActionResult Create([FromBody] Product_CategoryDto news)
        {
            //登記操作者
            news.CreateUser = _currentUser.UserName;
            news.UpdateUser = _currentUser.UserName;

            //
            var myJson = _service.Create(news);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] Product_CategoryDto news)
        {
            //登記操作者
            news.UpdateUser = _currentUser.UserName;

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

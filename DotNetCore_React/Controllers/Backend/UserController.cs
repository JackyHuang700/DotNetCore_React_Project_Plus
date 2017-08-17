using DotNetCore_React.Application.UserApp;
using DotNetCore_React.Application.UserApp.Dtos;
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

    public class UserController : AuthorizedController
    {
           private readonly IUserAppService _service;

        public UserController(IUserAppService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]

        public ActionResult Get_User(string id)
        {
            var myJson = _service.GetUser(id);
           
            return Json(myJson);
        }

        [HttpGet("[action]")]

        public ActionResult Get_User_By_UserName(string userName)
        {
            var myJson = _service.GetUser_By_UserName(userName);

            return Json(myJson);
        }


        [HttpGet("[action]")]

        public ActionResult User_View()
        {
            var myJson = _service.GetAllList();
            return Json(myJson);
        }


        [HttpPost("[action]")]

        public ActionResult Create([FromBody] UserDto user)
        {
            user.CreateUser = _currentUser.UserName;
            var myJson = _service.Create_User(user);
            return Json(myJson);
        }

        [HttpPost("[action]")]

        public ActionResult Edit([FromBody] UserDto user)
        {
            var myJson = _service.Update_User(user);
            return Json(myJson);
        }

        [HttpPost("[action]")]
        public ActionResult Edit_Personal_User([FromBody] Personal_UserDto user)
        {
            var myJson = _service.Update_Personal_User(user);
            return Json(myJson);
        }

        [HttpPost("[action]")]
        public ActionResult Personal_Edit([FromBody] Personal_UserDto user)
        {
            var myJson = _service.Update_Personal_User(user);
            return Json(myJson);
        }


        [HttpPost("[action]/{id}")]

        public ActionResult Delete(string id)
        {
            var myJson = _service.Delete_User(id);
            return Json(myJson);
        }

        [HttpPost("[action]")]
        public ActionResult Get_CurrentUser_UserName()
        {
            byte[] userObject = null;
            HttpContext.Session.TryGetValue("CurrentUser", out userObject);
            string UserName = "";
            if (userObject != null)
            {
                UserName = ByteConvertHelper.Bytes2Object<UserSimpleDto>(userObject).UserName;
            }

            return Json(UserName);
        }


        /// <summary>
        /// 啟用帳號
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult EmailConfirm(string userName, string passwordHash)
        {
            var myJson = _service.EmailConfirm(userName, passwordHash);
            return Json(myJson);
        }
    }
}
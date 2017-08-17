using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetCore_React.Application.RoleApp;
using DotNetCore_React.Application.UserApp;
using Microsoft.AspNetCore.Mvc;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.UserApp.Dtos;
using Newtonsoft.Json;
using DotNetCore_React.Utility;
using Newtonsoft.Json.Linq;

namespace DotNetCore_React.Controllers
{
    /// <summary>
    /// API (Front)
    /// </summary>
    [Route("api/[controller]")]
    public class WebApiController : BaseController
    {
        private readonly IUserAppService _service;

        public WebApiController(IUserAppService service)
        {
            _service = service;
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromBody] UserDto userDto)
        {

            var myJson = _service.Login(userDto.UserName, userDto.Password);

            var checkLogged = bool.Parse(myJson["success"].ToString());
            if (checkLogged)
            {
                //記錄Session
                UserSimpleDto user = (UserSimpleDto)(myJson["user"]);
                HttpContext.Session.Set("CurrentUser", ByteConvertHelper.Object2Bytes(user));
            }

            return Json(myJson);
        }

        [HttpGet("[action]")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();

            return Json(new Dictionary<string, object> {
                { "success", true},
                { "message",  "Bye Bye!"}
            });
        }

        [HttpGet("[action]")]
        public IActionResult isLogin()
        {
            var myJson = new Dictionary<string, object>()
            {
                { "success",false },
                { "message",null }
            };

            byte[] userObject = null;

            HttpContext.Session.TryGetValue("CurrentUser", out userObject);

            if (userObject != null)
            {

                var user = ByteConvertHelper.Bytes2Object<UserSimpleDto>(userObject);

                myJson["success"] = true;
                myJson["user"] = new UserSimpleDto
                {
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Status = user.Status
                };
            }
            return Json(myJson);
        }

        [HttpPost("[action]")]
        public IActionResult forgot([FromBody] dynamic data)
        {
            return Json(_service.forgot((string)data["userName"], (string)data["email"]));
        }

        [HttpPost("[action]")]
        public IActionResult forgotConfirm([FromBody] dynamic data)
        {
            return Json(_service.forgotConfirm((string)data["username"], (string)data["passwordhash"]));
        }

        [HttpPost("[action]")]
        public IActionResult changePassword([FromBody] dynamic data)
        {
            byte[] userObject = null;
            HttpContext.Session.TryGetValue("CurrentUser", out userObject);
            UserSimpleDto user = null;
            if (userObject != null)
            {
                user = ByteConvertHelper.Bytes2Object<UserSimpleDto>(userObject);
            }
            return Json(_service.changePassword(user, (string)data["username"], (string)data["newPassword"], (string)data["passwordhash"]));
        }
    }
}

using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using DotNetCore_React.Utility;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.UserApp.Dtos;

namespace DotNetCore_React.Controllers
{
    /// <summary>
    /// 權限驗證 (Back)
    /// </summary>
    public class AuthorizedController : Controller
    {
        protected UserSimpleDto _currentUser { private set; get; }

        //判斷用戶是否登入
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            byte[] result;
            filterContext.HttpContext.Session.TryGetValue("CurrentUser", out result);
            if (result == null)
            {
                filterContext.Result = new RedirectResult("/login");
                return;
            }
            _currentUser = ByteConvertHelper.Bytes2Object<UserSimpleDto>(result);
            base.OnActionExecuting(filterContext);
        }
    }
}

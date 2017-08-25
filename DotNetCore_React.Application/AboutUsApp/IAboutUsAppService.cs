using System;
using System.Collections.Generic;
using DotNetCore_React.Application.AboutUsApp.Dtos;

namespace DotNetCore_React.Application.AboutUsApp
{
    public interface IAboutUsAppService
    {
        //根據帳號獲取權限
        List<AboutUsDto> GetAll();

        List<AboutUs_CategoryDto> GetAll_Category();


        AboutUsDto GetSingle(string id);


        //更新使用者資料
        Dictionary<string, object> Update(AboutUsDto News);


        Dictionary<string, object> Create(AboutUsDto News);

        Dictionary<string, object> Delete(string id);
    }
}
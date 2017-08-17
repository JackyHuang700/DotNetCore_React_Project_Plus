using System;
using System.Collections.Generic;
using DotNetCore_React.Application.Sys_LanguageApp.Dtos;

namespace DotNetCore_React.Application.Sys_LanguageApp
{
    public interface ISys_LanguageAppService
    {
        //根據帳號獲取權限
        List<Sys_LanguageDto> GetAll();

        Sys_LanguageDto GetSingle(int id);


        //更新使用者資料
        Dictionary<string, object> Update(Sys_LanguageDto Sys_LanguageApp);


        Dictionary<string, object> Create(Sys_LanguageDto Sys_LanguageApp);

        Dictionary<string, object> Delete(int id);
    } 
}
using System;
using System.Collections.Generic;
using DotNetCore_React.Application.News_LanApp.Dtos;

namespace DotNetCore_React.Application.News_LanApp
{
    public interface INews_LanAppService
    {
        //根據帳號獲取權限
        List<News_LanDto> GetAll();

        News_LanDto GetSingle(string id);


        //更新使用者資料
        Dictionary<string, object> Update(News_LanDto News_Lan);


        Dictionary<string, object> Create(News_LanDto News_Lan);

        Dictionary<string, object> Delete(string id);
    } 
}
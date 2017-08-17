using System;
using System.Collections.Generic;
using DotNetCore_React.Application.NewsApp.Dtos;

namespace DotNetCore_React.Application.NewsApp
{
    public interface INewsAppService
    {
        //根據帳號獲取權限
        List<NewsDto> GetAll();

        NewsDto GetSingle(string id);


        //更新使用者資料
        Dictionary<string, object> Update(NewsDto News);


        Dictionary<string, object> Create(NewsDto News);

        Dictionary<string, object> Delete(string id);
    } 
}
using System;
using System.Collections.Generic;
using DotNetCore_React.Application.LocationApp.Dtos;
using Microsoft.AspNetCore.Http;

namespace DotNetCore_React.Application.LocationApp
{
    public interface ILocationAppService
    {
        //根據帳號獲取權限
        List<LocationDto> GetAll();

        LocationDto GetSingle(string id);


        //更新使用者資料
        Dictionary<string, object> Update(LocationDto News);


        Dictionary<string, object> Create(LocationDto News);

        Dictionary<string, object> Delete(string id);
    }
}
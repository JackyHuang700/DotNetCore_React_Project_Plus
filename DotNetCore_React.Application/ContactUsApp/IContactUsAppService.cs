using System;
using System.Collections.Generic;
using DotNetCore_React.Application.ContactUsApp.Dtos;

namespace DotNetCore_React.Application.ContactUsApp
{
    public interface IContactUsAppService
    {
        //根據帳號獲取權限
        List<ContactUsDto> GetAll();

        ContactUsDto GetSingle(string id);


        //更新使用者資料
        Dictionary<string, object> Update(ContactUsDto News);


        Dictionary<string, object> Create(ContactUsDto News);

        Dictionary<string, object> Delete(string id);
    }
}
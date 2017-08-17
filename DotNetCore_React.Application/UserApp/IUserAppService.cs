using DotNetCore_React.Application.UserApp.Dtos;
using DotNetCore_React.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.UserApp
{
    public interface IUserAppService
    {
        //獲取列表
        List<UserDto> GetAllList();

        UserDto GetUser(string id);

        Personal_UserDto GetUser_By_UserName(string userName);

        Dictionary<string, object> Login(string userName, string password);

        Dictionary<string, object> Create_User(UserDto user);
        Dictionary<string, object> Delete_User(string id);
        Dictionary<string, object> Update_User(UserDto user);

        Dictionary<string, object> Update_Personal_User(Personal_UserDto user);

        Dictionary<string, object> forgot(string userName, string email);

        Dictionary<string, object> forgotConfirm(string userName, string passwordhash);

        Dictionary<string, object> changePassword(UserSimpleDto user, string userName, string newPassword, string passwdhash);

        Dictionary<string, object> EmailConfirm(string userName, string passwordhash);

        
    }
}

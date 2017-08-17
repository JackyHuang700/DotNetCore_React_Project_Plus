using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DotNetCore_React.Application.UserApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using System.Security.Cryptography;
using System.Text;
using DotNetCore_React.Utility;
using DotNetCore_React.Utility.Services;

namespace DotNetCore_React.Application.UserApp
{
    public class UserAppService : IUserAppService
    {
        private readonly IUserRepository _repository_user;
        private readonly IComSystemRepository _repository_comSystem;
        private readonly IMailServices _mailServices;

        public UserAppService(IUserRepository repository_usr, IComSystemRepository repository_comSystem,IMailServices mailServices)
        {
            _repository_user = repository_usr;
            _repository_comSystem = repository_comSystem;
            _mailServices = mailServices;
        }

        public Dictionary<string, object> Create_User(UserDto user)
        {
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };

            //檢查是否重複
            var checkMail = _repository_user.FirstOrDefault(o => o.Email == user.Email);
            if (checkMail != null)
            {
                myJson["message"] = "郵件已存在";
                return myJson;
            }

            var checkUserName = _repository_user.FirstOrDefault(o => o.UserName == user.UserName);
            if (checkUserName != null)
            {
                myJson["message"] = "帳戶已存在";
                return myJson;
            }

            var dateTime = DateTime.Now;
            var roleDB = new User()
            {
                Id = Guid.NewGuid(),
                Password = HashHelper.CreateSHA256(user.Password),
                RoleId = user.RoleId,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                EmailConfirmed = user.EmailConfirmed,
                Status = user.Status,
                CreateDate = dateTime,
                CreateUser = user.CreateUser,
                UpdateDate = dateTime,
                UpdateUser = user.RoleId,
                FailedCount = 0,
                ChangedPassword = false,
                PasswordHash = Guid.NewGuid().ToString(),
            };

            //儲存資料
            _repository_user.Insert(roleDB);
            var effect = _repository_user.Save();

            myJson["success"]= effect > 0;
            myJson["message"]= effect > 0 ? "操作完成" : "操作失敗";
            return myJson;
        }

        public Dictionary<string, object> Delete_User(string id)
        {
            var myJson = new Dictionary<string, object>();

            //轉換Guid
            Guid guid;
            Guid.TryParse(id, out guid);


            //刪除資料
            _repository_user.Delete(guid);
            var effect = _repository_user.Save();
            myJson.Add("success", effect > 0);
            myJson.Add("message", effect > 0 ? "操作完成" : "操作失敗");
            return myJson;
        }

        public List<UserDto> GetAllList()
        {
            var a = _repository_user.GetAllList();
            return Mapper.Map<List<UserDto>>(a);
        }

        public UserDto GetUser(string id)
        {
            //處理null狀況
            Guid guid;
            Guid.TryParse(id, out guid);
            var a = _repository_user.Get(guid);
            a.Password = String.Empty;
            return Mapper.Map<UserDto>(a);
        }

        public Personal_UserDto GetUser_By_UserName(string userName)
        {
            var a = _repository_user.FirstOrDefault(o => o.UserName == userName);
            a.Password = String.Empty;
            return Mapper.Map<Personal_UserDto>(a);
        }


        public Dictionary<string, object> Login(string userName, string password)
        {
            var myJson = new Dictionary<string, object>();
            var user = _repository_user.FirstOrDefault(o => o.UserName == userName);

            if (user == null)
            {
                myJson.Add("success", false);
                myJson.Add("message", "登入失敗");
                return myJson;
            }

            if (user.Password != HashHelper.CreateSHA256(password))
            {
                user.Status = 255;
                user.FailedCount++;

                //失敗次數是否超過系統預設值
                var AccessFailedCount = _repository_comSystem.GetComSystem("AccessFailedCount");
                var sysFailedCount = int.Parse(AccessFailedCount.sysValue);
                if (user.FailedCount >= sysFailedCount)
                {
                    user.Status = (byte)User_Status.ERROR_COUNT;
                }

                //更新狀態
                _repository_user.Update(user);
                _repository_user.Save();
            }

            //判斷狀態
            switch (user.Status)
            {
                case (byte)User_Status.STOP:
                    myJson.Add("success", false);
                    myJson.Add("message", "您已被停權，請聯絡管理員。");
                    break;
                case (byte)User_Status.NORMAL:
                    myJson.Add("success", true);
                    myJson.Add("message", "登入成功");
                    myJson.Add("user", Mapper.Map<UserSimpleDto>(user));

                    //更新錯誤次數
                    if (user.FailedCount > 0)
                    {
                        user.FailedCount = 0;
                        _repository_user.Update(user);
                        _repository_user.Save();
                    }
                    break;
                case (byte)User_Status.EMAIL_NO_VAILD:
                    myJson.Add("success", false);
                    myJson.Add("message", "信箱未驗證，請立即驗證");
                    break;
                case (byte)User_Status.FIRST_PASSWORD_UNCHANGE:
                    myJson.Add("success", true);
                    myJson.Add("message", "第一次未更改密碼");
                    myJson.Add("user", Mapper.Map<UserSimpleDto>(user));
                    break;
                case (byte)User_Status.ERROR_COUNT:
                    myJson.Add("success", false);
                    myJson.Add("message", $"錯誤次數達{user.FailedCount}次，請聯絡管理員，或按下忘記密碼");
                    break;
                default:
                    myJson.Add("success", false);
                    myJson.Add("message", "帳號或密碼不正確");
                    break;
            }

            return myJson;
        }

        public Dictionary<string, object> Update_User(UserDto user)
        {
            var myJson = new Dictionary<string, object>();

            var userDB = Mapper.Map<User>(user);

            //更新密碼
            if(!string.IsNullOrWhiteSpace(user.Password)){
                userDB.Password = HashHelper.CreateSHA256(user.Password);
                userDB.ChangedPassword = true;
            }

            //回復狀態時，將錯誤次數清空
            if (userDB.Status == (byte)User_Status.NORMAL)
            {
                userDB.FailedCount = 0;
            }

            _repository_user.Update(userDB);
            var effect = _repository_user.Save();
            myJson.Add("success", effect > 0);
            myJson.Add("message", effect > 0 ? "操作完成" : "操作失敗");
            return myJson;
        }

        /// <summary>
        /// 修改個人資料
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public Dictionary<string, object> Update_Personal_User(Personal_UserDto user)
        {
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };

            var userDB = _repository_user.Get(user.Id);
            //抓取不包含自己的mail清單
            var emailList = _repository_user.GetAllList(c => c.Email != userDB.Email).Select(c => c.Email).ToList();

            //驗證
            //比對email是否有更改
            var is_Change_Email = user.Email.Trim() == user.Email.Trim();
            //比對email是否有重複
            var is_Repeat_Email = emailList.Contains(user.Email) == false;

            //更新
            if (is_Change_Email)
            {
                if (is_Repeat_Email)
                {
                    //修改資料
                    userDB.Password = HashHelper.CreateSHA256(user.Password);
                    userDB.Email = user.Email;
                    userDB.FirstName = user.FirstName;
                    userDB.LastName = user.LastName;
                    //有修改email
                    userDB.EmailConfirmed = false;
                    userDB.Status = (byte)User_Status.EMAIL_NO_VAILD;
                    _repository_user.Update(userDB);
                    var effect = _repository_user.Save();

                    //寄信
                    _mailServices.AddTo(userDB.UserName, userDB.Email);
                    _mailServices.Sent("啟用帳號", $"請點選 <a href='$Domain$/EmailConfirm?userName={userDB.UserName}&passwordhash={userDB.PasswordHash}'>啟用</a> 進行啟用帳號。");


                    if (effect > 0)
                    {
                        myJson["success"] = true;
                        myJson["message"] = "修改成功";
                        return myJson;
                    }
                }
            }

            return myJson;
        }

        public Dictionary<string, object> forgot(string userName, string email)
        {
            var myJson = new Dictionary<string, object>() {
                {"success",false },
                {"message",null }
            };

            var getUser = _repository_user.FirstOrDefault(o => o.UserName == userName && o.Email == email);
            if (getUser == null)
            {
                myJson["message"] = "資料比對錯誤";
                return myJson;
            }

            var newPasswdHash = Guid.NewGuid().ToString("N");
            getUser.PasswordHash = newPasswdHash;
            getUser.Status = (byte)User_Status.EMAIL_NO_VAILD;

            _repository_user.Update(getUser);
            var effect = _repository_user.Save();

            //寄信API
            _mailServices.AddTo(getUser.UserName, getUser.Email);
            _mailServices.Sent("密碼重置", $"請點選 <a href='$Domain$/forgot?userName={getUser.UserName}&passwordhash={newPasswdHash}'>重置密碼</a> 進行重置密碼。");

            myJson.Add("success", effect > 0);
            myJson.Add("message", effect > 0 ? "已傳送密碼重置至您的信箱" : "操作失敗");
            return myJson;
        }


        public Dictionary<string, object> EmailConfirm(string userName, string passwordhash)
        {
            var myJson = new Dictionary<string, object>() {
                {"success",false },
                {"message",null }
            };

            var getUser = _repository_user.FirstOrDefault(o => o.UserName == userName && o.PasswordHash == passwordhash);
            //啟用帳號
            if (getUser != null)
            {
                getUser.Status = (byte)User_Status.NORMAL;
                _repository_user.Update(getUser);
                var effect = _repository_user.Save();

                myJson["success"] = effect > 0;
                myJson["message"] = effect > 0 ? "啟用成功" : "啟用失敗";

                return myJson;
            }

            return myJson;
        }

        public Dictionary<string, object> forgotConfirm(string userName, string passwdhash)
        {
            var myJson = new Dictionary<string, object>() {
                {"success",false },
                {"message",null }
            };

            var getUser = _repository_user.FirstOrDefault(o => o.UserName == userName && o.PasswordHash == passwdhash);
            if (getUser == null)
            {
                myJson["message"] = "資料比對錯誤";
                return myJson;
            }

            myJson.Add("success", true);
            myJson.Add("message", "請修改密碼。");
            return myJson;
        }

        public Dictionary<string, object> changePassword(UserSimpleDto user, string userName, string newPassword, string passwdhash)
        {
            var myJson = new Dictionary<string, object>() {
                {"success",false },
                {"message","更新密碼失敗" }
            };

            //驗證是否為使用者本人
            if (user == null && string.IsNullOrEmpty(passwdhash))
            {
                myJson["message"] = "無法驗證身分";
                return myJson;
            }


            var getUser = _repository_user.FirstOrDefault(o => o.UserName == userName);
            if (getUser == null)
            {
                myJson["message"] = "無法驗證身分";
                return myJson;
            }

            if (user != null)
            {
                //如果使用者已經登入，允許其直接更改密碼
                if (user.UserName == userName)
                {
                    UpdatePwd(newPassword, getUser);
                    myJson["success"] = true;
                    myJson["message"] = "操作成功";
                }
            }

            //比對雜湊碼
            if (getUser.PasswordHash == passwdhash)
            {
                UpdatePwd(newPassword, getUser);
                myJson["success"] = true;
                myJson["message"] = "操作成功";
            }

            return myJson;
        }

        private int UpdatePwd(string newPassword, User getUser)
        {
            getUser.PasswordHash = string.Empty;
            getUser.Password = HashHelper.CreateSHA256(newPassword);
            getUser.ChangedPassword = true;
            getUser.Status = (byte)User_Status.NORMAL;
            _repository_user.Update(getUser);
            return _repository_user.Save();
        }

       
    }

    public enum User_Status : byte
    {
        /// <summary>
        /// 已停權
        /// </summary>
        STOP = 0,

        /// <summary>
        /// 正常啟用
        /// </summary>
        NORMAL = 1,

        /// <summary>
        /// 信箱未驗證
        /// </summary>
        EMAIL_NO_VAILD = 2,

        /// <summary>
        /// 第一次未更改密碼
        /// </summary>
        FIRST_PASSWORD_UNCHANGE = 3,

        /// <summary>
        /// 錯誤次數
        /// </summary>
        ERROR_COUNT = 4
    }
}

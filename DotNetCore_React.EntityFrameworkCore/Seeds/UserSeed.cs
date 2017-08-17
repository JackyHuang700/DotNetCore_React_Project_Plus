using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Utility;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        private void UserSeed()
        {
            if (!_context.Set<User>().Any())
            {
                var roleID = _context.Set<Role>().Where(o => o.SysId == "Admin").Select(o=>o.Id.ToString()).FirstOrDefault();
                _context.Set<User>().Add(new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "admin@test.com",
                    RoleId = roleID,
                    Password = HashHelper.CreateSHA256("admin@test.com"),
                    FirstName = "Admin",
                    LastName = "Super",
                    Email = "admin@test.com",
                    EmailConfirmed = true,
                    Status = 1,
                    CreateDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    CreateUser = "Admin",
                    UpdateUser = "Admin",
                    FailedCount = 0,
                    ChangedPassword = true,
                    PasswordHash = null,
                });

                _context.SaveChanges();
            }
        }
    }
}

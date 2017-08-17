using DotNetCore_React.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        private void RoleSeed()
        {
            if (!_context.Set<Role>().Any())
            {

                var data1 = new Role
                {
                    Id = Guid.NewGuid(),
                    SysId = "Admin",
                    Name = "管理員",
                    CreateDate = DateTime.Now,
                    CreateUser = "Admin",
                    UpdateDate = DateTime.Now,
                    UpdateUser = "Admin",
                    Priority = 0,
                    Status = 1,
                };

                _context.Set<Role>().Add(data1);
                _context.SaveChanges();
            }
        }
    }
}

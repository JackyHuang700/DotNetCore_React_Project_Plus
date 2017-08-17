using System;
using System.Collections.Generic;
using System.Text;
using DotNetCore_React.Domain.Entities;
using System.Linq;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        private void ComSystemSeed()
        {
            if (!_context.Set<ComSystem>().Any())
            {           
                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "AccessFailedCount",
                    sysValue = "5",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });

                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "Product_ListImage_MaxSize",
                    sysValue = "300",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });

                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "Product_ListImage_File",
                    sysValue = "jpg,png",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });

                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "Product_Image_MaxSize",
                    sysValue = "300",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });


                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "Product_Image_File",
                    sysValue = "jpg,png",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });

                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "Location_ListImage_MaxSize",
                    sysValue = "300",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });

                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "Location_ListImage_File",
                    sysValue = "jpg,png",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });

                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "Location_Image_MaxSize",
                    sysValue = "300",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });

                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "Location_Image_File",
                    sysValue = "jpg,png",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });

                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "System_Logo",
                    sysValue = "/Image/Logo.jpg",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });

                _context.Set<ComSystem>().Add(new ComSystem
                {
                    Id = Guid.NewGuid(),
                    sysName = "System_Logo_Text",
                    sysValue = "Ace Admin",
                    CreateTime = DateTime.Now,
                    UpdateTime = DateTime.Now,

                });
                


                _context.SaveChanges();
            }
        }
    }
}

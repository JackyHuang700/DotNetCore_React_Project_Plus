using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        private void LocationSeed()
        {
            Guid newsId = Guid.NewGuid();
            if (!_context.Set<Location>().Any())
            {
                var data1 = new List<Location>() {
                    new Location{
                        Country = "taiwan",
                        Area = 10,
                        Phone = "0423333333",
                        Fax = "0911111111",
                        Mobile = "0911111111",
                        Latitude = 11.11,
                        Longitude = 11.11,
                        Priority = 1,
                        Status = 1,
                                CreateDate = DateTime.Now,
                            CreateUser = "Admin",
                            UpdateDate = DateTime.Now,
                            UpdateUser = "Admin",
                    },
                };

                _context.Set<Location>().AddRange(data1);
                var success = _context.SaveChanges() == data1.Count;
                if (success)
                {
                    //image
                    var data2 = new List<Location_Image>() {
                    new Location_Image{
                        LocationId = data1.Select(c => c.Id).FirstOrDefault(),
                        Image = "aa.jpg",
                        Description = "圖片描述",
                    }
                    };
                    _context.Set<Location_Image>().AddRange(data2);
                    _context.SaveChanges();
                    //lan
                    var data3 = new List<Location_Lan>() {
                    new Location_Lan{
                           LocationId = data1.Select(c => c.Id).FirstOrDefault(),
                           LanguageId= _context.Sys_Languages.Where(c => c.Name == "繁體中文").Select(c => c.Id).FirstOrDefault(),
                           Name = "標題1",
                           Address = "地址1",
                           Description = "店家描述",
                    }
                    };

                    _context.Set<Location_Lan>().AddRange(data3);
                    _context.SaveChanges();
                }
            }
        }
    }
}

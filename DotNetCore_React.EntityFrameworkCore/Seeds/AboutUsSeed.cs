using DotNetCore_React.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        private void AboutUsSeed()
        {
            Guid newsId = Guid.NewGuid();

            if (!_context.Set<AboutUs_Category>().Any())
            {

                var data1 = new List<AboutUs_Category>() {
                     new AboutUs_Category{
                  Name = "企業介紹",
                },
                new AboutUs_Category{
                  Name = "AboutUs_0",
                },
                  new AboutUs_Category{
                  Name = "AboutUs_1",
                },
                };

                _context.Set<AboutUs_Category>().AddRange(data1);
                var success = _context.SaveChanges() == data1.Count;
                if (success)
                {
                    if (!_context.Set<AboutUs>().Any())
                    {
                        var data2 = new AboutUs
                        {
                            Id = newsId,
                            CategoryId = data1.Select(c => c.Id).FirstOrDefault(),
                            Status = 1,
                            CreateDate = DateTime.Now,
                            CreateUser = "Admin",
                            UpdateDate = DateTime.Now,
                            UpdateUser = "Admin",
                        };

                        _context.Set<AboutUs>().Add(data2);
                        var aboutUsSuccess = _context.SaveChanges() > 0;
                        if (aboutUsSuccess)
                        {
                            if (!_context.Set<AboutUs_Lan>().Any())
                            {

                                var data3 = new AboutUs_Lan
                                {
                                    Id = Guid.NewGuid(),
                                    AboutUsId = data2.Id,
                                    Content = "Content",
                                };

                                _context.Set<AboutUs_Lan>().Add(data3);
                                _context.SaveChanges();
                            }
                        }
                    }
                }
            }

        }
    }
}

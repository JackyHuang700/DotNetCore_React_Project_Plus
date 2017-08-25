using DotNetCore_React.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        private void ContactUsSeed()
        {
            if (!_context.Set<ContactUs_Category>().Any())
            {
                var a = _context.Sys_Languages.Where(c => c.Name == "繁體中文").FirstOrDefault();
                var data1 = new List<ContactUs_Category>() {
                   new ContactUs_Category{
                    LanguageId = a.Id,
                    Name = "聯絡我們1"
                   },
                };
                _context.Set<ContactUs_Category>().AddRange(data1);
                var success = _context.SaveChanges() == data1.Count;
                if (success)
                {
                    if (!_context.Set<ContactUs>().Any())
                    {
                        var data2 = new ContactUs
                        {
                            Id = Guid.NewGuid(),
                            CategoryId = data1.Select(c => c.Id).FirstOrDefault(),
                            Content = "內容",
                            CreateDate = DateTime.Now,
                            CreateUser = "Admin",
                            UpdateDate = DateTime.Now,
                            UpdateUser = "Admin",
                            CustomerEmail = "Admin@gmail.com",
                            CustomerName = "Customer",
                            Mobile = "0923000000",
                            Reply = "回覆",
                            ReplyDate = DateTime.Now,
                            ReplyUser = "Admin",
                            Status = 1,
                            Title = "title",
                        };
                        _context.Set<ContactUs>().Add(data2);
                        var aboutUsSuccess = _context.SaveChanges() > 0;
                    }
                }
            }
        }
    }
}
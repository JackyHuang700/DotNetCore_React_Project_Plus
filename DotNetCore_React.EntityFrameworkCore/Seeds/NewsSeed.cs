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
        private void NewsSeed()
        {
            Guid newsId = Guid.NewGuid();


            if (!_context.Set<News>().Any())
            {
                var data1 = new News
                {
                    Id = newsId,
                    ListImage = "aa.jpg",
                    Category = 0,
                    Priority = 0,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now,
                    Status = 1,
                    CreateDate = DateTime.Now,
                    CreateUser = "Admin",
                    UpdateDate = DateTime.Now,
                    UpdateUser = "Admin",
                };

                _context.Set<News>().Add(data1);
                _context.SaveChanges();
            }


            if (!_context.Set<News_Lan>().Any())
            {

                var data1 = new News_Lan
                {
                    Id = Guid.NewGuid(),
                    NewsId = newsId,
                    LanguageId = 1,
                    Title = "Title",
                    SubTitle = "SubTitle",
                    Content = "Content",
                };

                _context.Set<News_Lan>().Add(data1);
                _context.SaveChanges();
            }
        }
    }
}

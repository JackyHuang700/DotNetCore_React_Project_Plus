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
        private void News_LanSeed()
        {
            if (!_context.Set<News_Lan>().Any())
            {

                var data1 = new News_Lan
                {
                    Id = Guid.NewGuid(),
                    NewsId = Guid.NewGuid(),
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

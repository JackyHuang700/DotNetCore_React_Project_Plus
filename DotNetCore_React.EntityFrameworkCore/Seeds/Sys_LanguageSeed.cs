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
        private void Sys_LanguageSeed()
        {
            if (!_context.Set<Sys_Language>().Any())
            {

                var data1 = new List<Sys_Language>
                {
                   new Sys_Language {
                    Name = "繁體中文",
                    IsDisplay= true,
                },
                   new Sys_Language {
                    Name = "簡體中文",
                    IsDisplay= false,
                }, new Sys_Language {
                    Name = "英文",
                    IsDisplay= false,
                },
                };

                _context.Set<Sys_Language>().AddRange(data1);
                _context.SaveChanges();
            }
        }
    }
}

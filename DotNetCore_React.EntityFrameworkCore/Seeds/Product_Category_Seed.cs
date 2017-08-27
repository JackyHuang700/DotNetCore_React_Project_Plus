using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {

        private void Product_Category_Seed()
        {
            if (!_context.Set<Product_Category_Lan>().Any())
            {
                //新增類別
                var data1 = new List<Product_Category>() {
                   new Product_Category{
                    Priority = 1,
                    Status = 1,
                            CreateDate = DateTime.Now,
                            CreateUser = "Admin",
                            UpdateDate = DateTime.Now,
                            UpdateUser = "Admin",
                   },
                };
                _context.Set<Product_Category>().AddRange(data1);
                var aboutUsSuccess = _context.SaveChanges() > 0;
                if (aboutUsSuccess)
                {
                    var a = _context.Sys_Languages.Where(c => c.Name == "繁體中文").FirstOrDefault();
                    var data2 = new List<Product_Category_Lan>() {
                   new Product_Category_Lan{
                    LanguageId = a.Id,
                    ProductCateId = data1.Select(c => c.Id).FirstOrDefault(),
                    Name = "產品類別1"
                   },
                };
                }
            }
        }
    }
}

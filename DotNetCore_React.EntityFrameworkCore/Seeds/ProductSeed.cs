using System;
using System.Collections.Generic;
using System.Text;
using DotNetCore_React.Domain.Entities;
using System.Linq;


namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        private void ProductSeed()
        {
            if (!_context.Set<Product>().Any())
            {
                var product_Category = _context.Product_Category.Select(c => c.Id).FirstOrDefault();
                var data1 = new List<Product>() {
                   new Product{
                   CategoryId = product_Category,
                   Priority = 1,
                   Status = 1,
                    CreateDate = DateTime.Now,
                            CreateUser = "Admin",
                            UpdateDate = DateTime.Now,
                            UpdateUser = "Admin",
                   },
                };

                _context.Set<Product>().AddRange(data1);
                var success = _context.SaveChanges() == data1.Count;
                if (success)
                {
                    if (!_context.Set<Product_Lan>().Any())
                    {
                        var a = _context.Sys_Languages.Where(c => c.Name == "繁體中文").FirstOrDefault();
                        var data2 = new List<Product_Lan>() {
                            new Product_Lan{
                                ProductId = data1.Select(c => c.Id).FirstOrDefault(),
                                LanguageId = a.Id,
                                Title = "產品1",
                                SubTitle = "產品副標題1",
                                Name = "產品名稱1",
                                Content = "產品內容1",
                            },
                        };
                        _context.Set<Product_Lan>().AddRange(data2);
                    }

                    if (!_context.Set<Product_Image>().Any())
                    {
                        var data3 = new List<Product_Image>() {
                            new Product_Image{
                                  ProductId = data1.Select(c => c.Id).FirstOrDefault(),
                                  Image = "bb.jpg",
                                  Description = "圖片描述",
                            }
                        };
                        _context.Set<Product_Image>().AddRange(data3);
                    }


                    _context.SaveChanges();
                }
            }
        }
    }

}

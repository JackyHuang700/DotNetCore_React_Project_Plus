using DotNetCore_React.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.Product_CategoryApp.Dtos
{
    public class Product_CategoryDto
    {
        public int Id { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public string Title { get; set; }

        public List<Product_Category_LanDto> LanList { get; set; }
    }
}

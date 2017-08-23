using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.Product_CategoryApp.Dtos
{
    public class Product_Category_LanDto
    {
        public int Id { get; set; }
        public int ProductCateId { get; set; }

        public int LanguageId { get; set; }
        public string Name { get; set; }
    }
}

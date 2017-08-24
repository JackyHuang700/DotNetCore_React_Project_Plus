using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.ProductApp.Dtos
{
    /// <summary>
    /// 
    /// </summary>
    public class Product_ImageDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
    }
}








using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 產品模組
    /// </summary>
    public class Product_Image : Entity
    {
        public Guid ProductId { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
    }
}

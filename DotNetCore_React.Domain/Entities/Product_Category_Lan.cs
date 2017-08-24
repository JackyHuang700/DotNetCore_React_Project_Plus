using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 產品類別
    /// </summary>
    public class Product_Category_Lan : Entity_Int
    {
        public int ProductCateId { get; set; }
        public int LanguageId { get; set; }
        public string Name { get; set; }
    }
}

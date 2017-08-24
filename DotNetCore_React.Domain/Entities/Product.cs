using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 產品模組
    /// </summary>
    public class Product : Entity
    {
        public string ListImage { get; set; }
        public int CategoryId { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    }
}

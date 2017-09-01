using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.ProductApp.Dtos
{
    /// <summary>
    /// 
    /// </summary>
    public class ProductDto
    {
        public Guid Id { get; set; }
        public int CategoryId { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public string Title { get; set; }


        ////°Æªí
        public List<Product_LanDto> LanList { get; set; }
        public List<Product_ImageDto> listImage { get; set; }
    }
}

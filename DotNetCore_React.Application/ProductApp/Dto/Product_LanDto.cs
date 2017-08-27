using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.ProductApp.Dtos
{
    /// <summary>
    /// 
    /// </summary>
    public class Product_LanDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }

        public int LanguageId { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.ContactUsApp.Dtos
{
    /// <summary>
    /// 
    /// </summary>
    public class ContactUsDto
    {
        public Guid Id { get; set; }
        public int CategoryId { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; }

        ////°Æªí
        public List<ContactUs_CategoryDto> ContactUs_CategoryList { get; set; }
    }
}

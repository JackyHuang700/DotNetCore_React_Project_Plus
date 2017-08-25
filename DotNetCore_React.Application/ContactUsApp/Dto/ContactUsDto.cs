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
        public string Title { get; set; }

        public int CategoryId { get; set; }
        public string Content { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string Mobile { get; set; }
        public string Reply { get; set; }
        public DateTime ReplyDate { get; set; }
        public string ReplyUser { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }

        public string CreateUser { get; set; }

        public DateTime UpdateDate { get; set; }

        public string UpdateUser { get; set; }

        ////°Æªí
        public List<ContactUs_CategoryDto> CategoryList { get; set; }
    }
}

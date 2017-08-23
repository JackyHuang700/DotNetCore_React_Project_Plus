using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 聯絡我們
    /// </summary>
    public class ContactUs_Category : Entity_Int
    {
        public int LanguageId { get; set; }
        public string Name { get; set; }
    }
}

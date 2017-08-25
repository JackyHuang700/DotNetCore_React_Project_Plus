using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.AboutUsApp.Dtos
{
    /// <summary>
    /// 
    /// </summary>
    public class AboutUs_LanDto
    {
        public Guid Id { get; set; }
        public Guid AboutUsId { get; set; }
        public int LanguageId { get; set; }
        public string Content { get; set; }
    }
}

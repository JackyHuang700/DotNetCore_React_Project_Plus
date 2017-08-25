using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 關於我們
    /// </summary>
    public class AboutUs_Lan : Entity
    {
        public Guid AboutUsId { get; set; }
        public int LanguageId { get; set; }

        public string Content { get; set; }
    }
}

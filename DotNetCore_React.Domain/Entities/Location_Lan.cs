using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 服務據點
    /// </summary>
    public class Location_Lan : Entity
    {
        public Guid LocationId { get; set; }
        public int LanguageId { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
    }
}

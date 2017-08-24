using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.LocationApp.Dtos
{
    /// <summary>
    /// 服務據點
    /// </summary>
    public class Location_LanDto
    {
        public Guid Id { get; set; }
        public Guid LocationId { get; set; }
        public int LanguageId { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
    }
}

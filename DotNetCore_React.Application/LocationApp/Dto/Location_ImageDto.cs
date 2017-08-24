using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.LocationApp.Dtos
{
    /// <summary>
    /// 服務據點
    /// </summary>
    public class Location_ImageDto
    {
        public Guid Id { get; set; }
        public Guid LocationId { get; set; }

        public string Image { get; set; }
        public string Description { get; set; }
    }
}

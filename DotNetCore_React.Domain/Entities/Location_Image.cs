using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 服務據點
    /// </summary>
    public class Location_Image : Entity
    {
        public Guid LocationId { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        
    }
}

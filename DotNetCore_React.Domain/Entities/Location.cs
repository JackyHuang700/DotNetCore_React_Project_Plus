using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 服務據點
    /// </summary>
    public class Location : Entity
    {
        public string ListImage { get; set; }
        public string Country { get; set; }
        public int Area { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Mobile { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUser { get; set; }

        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.LocationApp.Dtos
{
    /// <summary>
    /// 服務據點
    /// </summary>
    public class LocationDto
    {
        public Guid Id { get; set; }
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



        ////副表
        public List<Location_LanDto> Location_LanList { get; set; }
        public List<Location_ImageDto> Location_ImageList { get; set; }
    }
}

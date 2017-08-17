using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.NewsApp.Dtos
{
    /// <summary>
    /// 最新消息
    /// </summary>
    public class NewsDto
    {
        public Guid Id { get; set; }

        public string ListImage { get; set; }

        public string Title { get; set; }

        public int Category { get; set; }

        public int Priority { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int Status { get; set; }

        public DateTime? CreateDate { get; set; }

        public string CreateUser { get; set; }

        public DateTime? UpdateDate { get; set; }

        public string UpdateUser { get; set; }


        //副表
        public List<News_LanApp.Dtos.News_LanDto> New_LanList { get; set; }
    }
}

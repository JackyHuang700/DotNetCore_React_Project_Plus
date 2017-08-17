using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 最新消息
    /// </summary>
    public class News : Entity
    {
        public string ListImage { get; set; }

        public int Category { get; set; }

        public int Priority { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int Status { get; set; }

        public DateTime? CreateDate { get; set; }

        public string CreateUser { get; set; }

        public DateTime? UpdateDate { get; set; }

        public string UpdateUser { get; set; }
    }
}

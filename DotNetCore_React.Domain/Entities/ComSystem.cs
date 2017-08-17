using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 系統資料表
    /// </summary>
    public class ComSystem : Entity
    {

        public string sysName { get; set; }

        public string sysValue { get; set; }

        public DateTime CreateTime { get; set; }

        public DateTime UpdateTime { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.ComSystemApp.Dtos
{
    public class ComSystemDto
    {
        public Guid Id { get; set; }
        public string sysName { get; set; }

        public string sysValue { get; set; }

        public DateTime CreateTime { get; set; }

        public DateTime UpdateTime { get; set; }
    }
}

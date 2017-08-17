using System;
using System.Collections.Generic;

namespace DotNetCore_React.Application.RoleApp.Dtos
{
    public class RoleDto
    {
        public Guid Id { get; set; }

        public string SysId { get; set; }

        public string Name { get; set; }

        public DateTime? CreateDate { get; set; }

        public string CreateUser { get; set; }

        public DateTime? UpdateDate { get; set; }

        public string UpdateUser { get; set; }

        public int Priority { get; set; }

        public int Status { get; set; }

    }
}

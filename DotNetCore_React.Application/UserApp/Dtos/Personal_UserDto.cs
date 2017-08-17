using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.UserApp.Dtos
{
    public class Personal_UserDto
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }


        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public int Status { get; set; }

    }
}

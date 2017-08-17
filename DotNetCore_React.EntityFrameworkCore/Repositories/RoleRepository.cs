using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class RoleRepository : DotNetCore_ReactRepositoryBase<Role>, IRoleRepository
    {
        public RoleRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }
    }
}


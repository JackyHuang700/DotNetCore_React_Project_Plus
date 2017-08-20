using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class Location_LanRepository : DotNetCore_ReactRepositoryBase<Location_Lan>, ILocation_LanRepository
    {
        public Location_LanRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }
    }
}

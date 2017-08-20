using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{

    public class AboutUs_LanRepository : DotNetCore_ReactRepositoryBase<AboutUs_Lan>, IAboutUs_LanRepository
    {
        public AboutUs_LanRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }
    }
}

using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class AboutUs_CategoryRepository : DotNetCore_ReactRepositoryBase_Int<AboutUs_Category>, IAboutUs_CategoryRepository
    {
        public AboutUs_CategoryRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class News_LanRepository : DotNetCore_ReactRepositoryBase<News_Lan>, INews_LanRepository
    {
        public News_LanRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }
    }
}

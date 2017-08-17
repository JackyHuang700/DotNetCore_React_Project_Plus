using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class NewsRepository : DotNetCore_ReactRepositoryBase<News>, INewsRepository
    {
        public NewsRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }

    }
}

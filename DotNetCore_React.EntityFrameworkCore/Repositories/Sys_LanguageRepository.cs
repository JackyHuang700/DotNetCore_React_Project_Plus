using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class Sys_LanguageRepository : DotNetCore_ReactRepositoryBase_Int<Sys_Language>, ISys_LanguageRepository
    {
        public Sys_LanguageRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }


        public new List<Sys_Language> GetAllList()
        {
            return _dbContext.Set<Sys_Language>().Where(c => c.IsDisplay == true).ToList();
        }

      
    }
}

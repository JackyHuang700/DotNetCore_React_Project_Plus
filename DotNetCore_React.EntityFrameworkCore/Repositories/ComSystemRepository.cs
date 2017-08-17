using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class ComSystemRepository : DotNetCore_ReactRepositoryBase<ComSystem>, IComSystemRepository
    {
        public ComSystemRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {

        }


        public List<ComSystem> GetAllComSystem()
        {
            return _dbContext.Set<ComSystem>().ToList();
        }


        public ComSystem GetComSystem(string sysName)
        {
            return _dbContext.Set<ComSystem>().Where(c => c.sysName == sysName).FirstOrDefault();
        }

        public ComSystem GetComSystem(Guid id)
        {
            return _dbContext.Set<ComSystem>().FirstOrDefault(C => C.Id == id);
        }

    }
}

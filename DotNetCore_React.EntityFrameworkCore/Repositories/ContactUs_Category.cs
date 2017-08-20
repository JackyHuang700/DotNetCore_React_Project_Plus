using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class ContactUs_CategoryRepository : DotNetCore_ReactRepositoryBase_Int<ContactUs_Category>, IContactUs_CategoryRepository
    {
        public ContactUs_CategoryRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }
    }
}

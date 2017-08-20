using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class Product_CategoryRepository : DotNetCore_ReactRepositoryBase_Int<Product_Category>, IProduct_CategoryRepository
    {
        public Product_CategoryRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }
    }
}

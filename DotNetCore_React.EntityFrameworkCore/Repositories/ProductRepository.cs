using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class ProductRepository : DotNetCore_ReactRepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }
    }
}

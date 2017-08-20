using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class Product_Category_LanRepository : DotNetCore_ReactRepositoryBase_Int<Product_Category_Lan>, IProduct_Category_LanRepository
    {
        public Product_Category_LanRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }
    }
}

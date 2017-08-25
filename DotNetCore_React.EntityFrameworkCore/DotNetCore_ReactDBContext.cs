using Microsoft.EntityFrameworkCore;
using DotNetCore_React.Domain.Entities;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace DotNetCore_React.EntityFrameworkCore
{
    public class DotNetCore_ReactDBContext : DbContext
    {

        public DotNetCore_ReactDBContext(DbContextOptions<DotNetCore_ReactDBContext> options) : base(options)
        {

        }


        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<ComSystem> ComSystem { get; set; }

        public DbSet<News> News { get; set; }
        public DbSet<News_Lan> News_Lan { get; set; }
        public DbSet<Sys_Language> Sys_Languages { get; set; }
        public DbSet<AboutUs> AboutUs { get; set; }
        public DbSet<AboutUs_Category> AboutUs_Category { get; set; }
        public DbSet<AboutUs_Lan> AboutUs_Lan { get; set; }
        public DbSet<ContactUs> ContactUs { get; set; }
        public DbSet<ContactUs_Category> ContactUs_Category { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<Location_Image> Location_Image { get; set; }
        public DbSet<Location_Lan> Location_Lan { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Product_Category> Product_Category { get; set; }
        public DbSet<Product_Category_Lan> Product_Category_Lan { get; set; }
        public DbSet<Product_Image> Product_Image { get; set; }
        public DbSet<Product_Lan> Product_Lan { get; set; }

        


        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
        }
    }
}

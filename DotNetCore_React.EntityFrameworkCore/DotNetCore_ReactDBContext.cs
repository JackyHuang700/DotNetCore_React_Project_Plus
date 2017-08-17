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



        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
        }
    }
}

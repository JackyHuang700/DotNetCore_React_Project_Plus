using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;
using System.Threading.Tasks;

namespace DotNetCore_React.EntityFrameworkCore.Seeds
{
    public partial class SeedConfiguration
    {
        protected readonly DotNetCore_ReactDBContext _context;

        public SeedConfiguration()
        {
            _context = CreateDbContext();
        }

        public SeedConfiguration(DotNetCore_ReactDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add Seed Method If you need.
        /// </summary>
        public void Seed()
        {

            _context.Database.EnsureCreated();


            //Seed Role
            ComSystemSeed();
            RoleSeed();
            UserSeed();
            News_LanSeed();
            NewsSeed();     
            Sys_LanguageSeed();
        }


        private static readonly string _jsonFile = "appsettings.json";
        private static readonly string _connectionName = "DefaultConnection";

        /// <summary>
        /// Create DbContext
        /// </summary>
        /// <returns></returns>
        private DotNetCore_ReactDBContext CreateDbContext()
        {
            var config = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile(_jsonFile)
                   .Build();

            var builder = new DbContextOptionsBuilder<DotNetCore_ReactDBContext>();
            builder.UseSqlServer(config.GetConnectionString(_connectionName));

            return new DotNetCore_ReactDBContext(builder.Options);
        }
    }
}
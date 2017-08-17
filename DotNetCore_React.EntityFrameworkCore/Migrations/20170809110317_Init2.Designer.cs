using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using DotNetCore_React.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Migrations
{
    [DbContext(typeof(DotNetCore_ReactDBContext))]
    [Migration("20170809110317_Init2")]
    partial class Init2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.ComSystem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreateTime");

                    b.Property<DateTime>("UpdateTime");

                    b.Property<string>("sysName");

                    b.Property<string>("sysValue");

                    b.HasKey("Id");

                    b.ToTable("ComSystem");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("CreateUser");

                    b.Property<string>("Name");

                    b.Property<int>("Priority");

                    b.Property<int>("Status");

                    b.Property<string>("SysId");

                    b.Property<DateTime?>("UpdateDate");

                    b.Property<string>("UpdateUser");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("ChangedPassword");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("CreateUser");

                    b.Property<string>("Email");

                    b.Property<bool>("EmailConfirmed");

                    b.Property<int>("FailedCount");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("RoleId");

                    b.Property<int>("Status");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UpdateUser");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using DotNetCore_React.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Migrations
{
    [DbContext(typeof(DotNetCore_ReactDBContext))]
    [Migration("20170825070621_Init4")]
    partial class Init4
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.AboutUs", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("CreateUser");

                    b.Property<int>("Status");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UpdateUser");

                    b.HasKey("Id");

                    b.ToTable("AboutUs");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.AboutUs_Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("AboutUs_Category");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.AboutUs_Lan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AboutUsId");

                    b.Property<string>("Content");

                    b.Property<int>("LanguageId");

                    b.HasKey("Id");

                    b.ToTable("AboutUs_Lan");
                });

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

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.ContactUs", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<string>("Content");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("CreateUser");

                    b.Property<string>("CustomerEmail");

                    b.Property<string>("CustomerName");

                    b.Property<string>("Mobile");

                    b.Property<string>("Reply");

                    b.Property<DateTime>("ReplyDate");

                    b.Property<string>("ReplyUser");

                    b.Property<int>("Status");

                    b.Property<string>("Title");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UpdateUser");

                    b.HasKey("Id");

                    b.ToTable("ContactUs");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.ContactUs_Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("LanguageId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ContactUs_Category");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Location", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Area");

                    b.Property<string>("Country");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("CreateUser");

                    b.Property<string>("Fax");

                    b.Property<double>("Latitude");

                    b.Property<string>("ListImage");

                    b.Property<double>("Longitude");

                    b.Property<string>("Mobile");

                    b.Property<string>("Phone");

                    b.Property<int>("Priority");

                    b.Property<int>("Status");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UpdateUser");

                    b.HasKey("Id");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Location_Image", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Image");

                    b.Property<Guid>("LocationId");

                    b.HasKey("Id");

                    b.ToTable("Location_Image");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Location_Lan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("Description");

                    b.Property<int>("LanguageId");

                    b.Property<Guid>("LocationId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Location_Lan");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.News", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Category");

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("CreateUser");

                    b.Property<DateTime?>("EndDate");

                    b.Property<string>("ListImage");

                    b.Property<int>("Priority");

                    b.Property<DateTime?>("StartDate");

                    b.Property<int>("Status");

                    b.Property<DateTime?>("UpdateDate");

                    b.Property<string>("UpdateUser");

                    b.HasKey("Id");

                    b.ToTable("News");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.News_Lan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<int>("LanguageId");

                    b.Property<Guid>("NewsId");

                    b.Property<string>("SubTitle");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("News_Lan");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("CreateUser");

                    b.Property<string>("ListImage");

                    b.Property<int>("Priority");

                    b.Property<int>("Status");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UpdateUser");

                    b.HasKey("Id");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Product_Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("CreateUser");

                    b.Property<int>("Priority");

                    b.Property<int>("Status");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UpdateUser");

                    b.HasKey("Id");

                    b.ToTable("Product_Category");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Product_Category_Lan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("LanguageId");

                    b.Property<string>("Name");

                    b.Property<int>("ProductCateId");

                    b.HasKey("Id");

                    b.ToTable("Product_Category_Lan");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Product_Image", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Image");

                    b.Property<Guid>("ProductId");

                    b.HasKey("Id");

                    b.ToTable("Product_Image");
                });

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Product_Lan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<int>("LanguageId");

                    b.Property<string>("Name");

                    b.Property<Guid>("ProductId");

                    b.Property<string>("SubTitle");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Product_Lan");
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

            modelBuilder.Entity("DotNetCore_React.Domain.Entities.Sys_Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsDisplay");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Sys_Languages");
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

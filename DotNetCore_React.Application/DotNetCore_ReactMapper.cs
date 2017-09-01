using System;
using System.Collections.Generic;
using System.Text;

/// 
using System.Linq;
using AutoMapper;
using DotNetCore_React.Application.RoleApp.Dtos;
using DotNetCore_React.Application.ComSystemApp.Dtos;
using DotNetCore_React.Application.UserApp.Dtos;
using DotNetCore_React.Application.NewsApp.Dtos;
using DotNetCore_React.Application.News_LanApp.Dtos;
using DotNetCore_React.Application.Sys_LanguageApp.Dtos;

using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.Product_CategoryApp.Dtos;
using DotNetCore_React.Application.ContactUsApp.Dtos;
using DotNetCore_React.Application.LocationApp.Dtos;
using DotNetCore_React.Application.ProductApp.Dtos;
using DotNetCore_React.Application.AboutUsApp.Dtos;

namespace DotNetCore_React.Application
{
    public class DotNetCore_ReactMapper
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Role, RoleDto>();
                cfg.CreateMap<RoleDto, Role>();

                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<UserDto, User>();
                cfg.CreateMap<User, UserSimpleDto>();
                cfg.CreateMap<UserSimpleDto, User>();
                cfg.CreateMap<User, Personal_UserDto>();
                cfg.CreateMap<Personal_UserDto, User>();

                cfg.CreateMap<ComSystem, ComSystemDto>();
                cfg.CreateMap<ComSystemDto, ComSystem>();

                cfg.CreateMap<News, NewsDto>()
                .ForMember(opt => opt.listImage, dest => dest.MapFrom(o => o.ListImage.Split(',').Where(s => !string.IsNullOrWhiteSpace(s)).Select(i => new GeneralDtos.ImageDto { image = i })));
                cfg.CreateMap<NewsDto, News>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.CreateDate, dest => dest.Ignore())
                .ForMember(opt => opt.CreateUser, dest => dest.Ignore())
                .ForMember(opt => opt.ListImage, dest => dest.MapFrom(o => string.Join(",",o.listImage.Select(i => i.image).ToList())));
                cfg.CreateMap<News_Lan, News_LanDto>();
                cfg.CreateMap<News_LanDto, News_Lan>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.NewsId, dest => dest.Ignore());



                cfg.CreateMap<Product_Category, Product_CategoryDto>();
                cfg.CreateMap<Product_CategoryDto, Product_Category>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.CreateDate, dest => dest.Ignore())
                .ForMember(opt => opt.CreateUser, dest => dest.Ignore());
                cfg.CreateMap<Product_Category_Lan, Product_Category_LanDto>();
                cfg.CreateMap<Product_Category_LanDto, Product_Category_Lan>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.LanguageId, dest => dest.Ignore());


                cfg.CreateMap<Product, ProductDto>()
                .ForMember(opt => opt.listImage, dest => dest.Ignore()); //這欄位應該要移除
                cfg.CreateMap<ProductDto, Product>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.CreateDate, dest => dest.Ignore())
                .ForMember(opt => opt.CreateUser, dest => dest.Ignore());
                cfg.CreateMap<Product_Lan, Product_LanDto>();
                cfg.CreateMap<Product_LanDto, Product_Lan>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.ProductId, dest => dest.Ignore())
                .ForMember(opt => opt.LanguageId, dest => dest.Ignore());
                cfg.CreateMap<Product_Image, Product_ImageDto>();
                cfg.CreateMap<Product_ImageDto, Product_Image>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.ProductId, dest => dest.Ignore());


                cfg.CreateMap<ContactUs, ContactUsDto>();
                cfg.CreateMap<ContactUsDto, ContactUs>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.CreateDate, dest => dest.Ignore())
                .ForMember(opt => opt.CreateUser, dest => dest.Ignore());
                cfg.CreateMap<ContactUs_Category, ContactUs_CategoryDto>();
                cfg.CreateMap<ContactUs_CategoryDto, ContactUs_Category>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.LanguageId, dest => dest.Ignore());


                cfg.CreateMap<AboutUs, AboutUsDto>();
                cfg.CreateMap<AboutUsDto, AboutUs>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.CreateDate, dest => dest.Ignore())
                .ForMember(opt => opt.CreateUser, dest => dest.Ignore());
                cfg.CreateMap<AboutUs_Lan, AboutUs_LanDto>();
                cfg.CreateMap<AboutUs_LanDto, AboutUs_Lan>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.AboutUsId, dest => dest.Ignore())
                .ForMember(opt => opt.LanguageId, dest => dest.Ignore());
                cfg.CreateMap<AboutUs_Category, AboutUs_CategoryDto>();
                cfg.CreateMap<AboutUs_CategoryDto, AboutUs_Category>()
                .ForMember(opt => opt.Id, dest => dest.Ignore());

                cfg.CreateMap<Location, LocationDto>()
                .ForMember(opt => opt.listImage, dest => dest.Ignore()); //這欄位應該要移除
                cfg.CreateMap<LocationDto, Location>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.CreateDate, dest => dest.Ignore())
                .ForMember(opt => opt.CreateUser, dest => dest.Ignore());
                cfg.CreateMap<Location_Lan, Location_LanDto>();
                cfg.CreateMap<Location_LanDto, Location_Lan>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.LocationId, dest => dest.Ignore())
                .ForMember(opt => opt.LanguageId, dest => dest.Ignore());
                cfg.CreateMap<Location_Image, Location_ImageDto>();
                cfg.CreateMap<Location_ImageDto, Location_Image>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.LocationId, dest => dest.Ignore());





                cfg.CreateMap<Sys_Language, Sys_LanguageDto>();
                cfg.CreateMap<Sys_LanguageDto, Sys_Language>();
            });
        }
    }
}

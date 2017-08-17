using System;
using System.Collections.Generic;
using System.Text;

/// 
using AutoMapper;
using DotNetCore_React.Application.RoleApp.Dtos;
using DotNetCore_React.Application.ComSystemApp.Dtos;
using DotNetCore_React.Application.UserApp.Dtos;
using DotNetCore_React.Application.NewsApp.Dtos;
using DotNetCore_React.Application.News_LanApp.Dtos;
using DotNetCore_React.Application.Sys_LanguageApp.Dtos;

using DotNetCore_React.Domain.Entities;

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

                cfg.CreateMap<News, NewsDto>();
                cfg.CreateMap<NewsDto, News>()
                .ForMember(opt => opt.Id , dest => dest.Ignore())
                .ForMember(opt => opt.CreateDate , dest => dest.Ignore())
                .ForMember(opt => opt.CreateUser , dest => dest.Ignore());

                cfg.CreateMap<News_Lan, News_LanDto>();
                cfg.CreateMap<News_LanDto, News_Lan>()
                .ForMember(opt => opt.Id, dest => dest.Ignore())
                .ForMember(opt => opt.NewsId, dest => dest.Ignore());

                cfg.CreateMap<Sys_Language, Sys_LanguageDto>();
                cfg.CreateMap<Sys_LanguageDto, Sys_Language>();
            });
        }
    }
}

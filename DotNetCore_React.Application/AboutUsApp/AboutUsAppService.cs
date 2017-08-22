using System;
using System.Collections.Generic;
using DotNetCore_React.Application.AboutUsApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.AboutUsApp;
using System.Linq;


namespace DotNetCore_React.Application.AboutUsApp
{
    public class AboutUsAppService : IAboutUsAppService
    {
        private readonly IAboutUsRepository _repository;
        private readonly IAboutUs_LanRepository _repository_lan;
        private readonly IAboutUs_CategoryRepository _repository_category;

        public AboutUsAppService(IAboutUsRepository repository, IAboutUs_LanRepository repository_lan, IAboutUs_CategoryRepository repository_category)
        {
            _repository = repository;
            _repository_lan = repository_lan;
            _repository_category = repository_category;
        }

        public Dictionary<string, object> Create(AboutUsDto News)
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, object> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<AboutUsDto> GetAll()
        {
            throw new NotImplementedException();
        }

        public AboutUsDto GetSingle(string id)
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, object> Update(AboutUsDto News)
        {
            throw new NotImplementedException();
        }
    }
}
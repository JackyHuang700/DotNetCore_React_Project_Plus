using System;
using System.Collections.Generic;
using DotNetCore_React.Application.LocationApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.ProductApp;
using System.Linq;
using DotNetCore_React.Application.ContactUsApp.Dtos;

namespace DotNetCore_React.Application.ContactUsApp
{
    public class ContactUsAppService : IContactUsAppService
    {
        private readonly IContactUsRepository _repository;
        private readonly IContactUs_CategoryRepository _repository_category;


        public ContactUsAppService(IContactUsRepository repository, IContactUs_CategoryRepository repository_category)
        {
            _repository = repository;
            _repository_category = repository_category;
        }

        public Dictionary<string, object> Create(ContactUsDto News)
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, object> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<ContactUsDto> GetAll()
        {
            throw new NotImplementedException();
        }

        public ContactUsDto GetSingle(string id)
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, object> Update(ContactUsDto News)
        {
            throw new NotImplementedException();
        }
    }
}
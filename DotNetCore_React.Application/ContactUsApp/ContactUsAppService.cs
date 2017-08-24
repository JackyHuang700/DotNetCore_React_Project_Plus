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
            var a = _repository.GetAllList();
            var newsDtoList = Mapper.Map<List<ContactUsDto>>(a);

            return newsDtoList;
        }

        public ContactUsDto GetSingle(string id)
        {
            //�ഫGuid
            Guid guid;
            Guid.TryParse(id, out guid);
            //����D��
            var a = _repository.Get(guid);
            var newsDto = Mapper.Map<ContactUsDto>(a);

            return newsDto;
        }

        public Dictionary<string, object> Update(ContactUsDto News)
        {
            //11.6.1	���A�u��קאּ�L���^��(2)�A�w�^�и򥼦^�г��O�t�ΧP�_
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };

            //��s�D��
            var newsDB = _repository.Get(News.Id);
            newsDB = Mapper.Map<ContactUsDto, ContactUs>(News, newsDB);

            newsDB.UpdateDate = DateTime.Now;
            _repository.Update(newsDB);
            var news_effect = _repository.Save() > 0;

            var success_effect = news_effect;
            myJson["success"] = success_effect;
            myJson["message"] = success_effect ? "��s���\" : "��s����";

            return myJson;
        }
    }
}
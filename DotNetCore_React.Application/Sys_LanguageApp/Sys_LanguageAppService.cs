using System;
using System.Collections.Generic;
using DotNetCore_React.Application.Sys_LanguageApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.Application.Sys_LanguageApp
{
    public class Sys_LanguageAppService : ISys_LanguageAppService
    {
        private readonly ISys_LanguageRepository _repository;


        public Sys_LanguageAppService(ISys_LanguageRepository repository)
        {
            _repository = repository;
        }

        public List<Sys_LanguageDto> GetAll()
        {
            var a = _repository.GetAllList();
            return Mapper.Map<List<Sys_LanguageDto>>(a);
        }
        public Sys_LanguageDto GetSingle(int id)
        {
           
            var a = _repository.Get(id);
            return Mapper.Map<Sys_LanguageDto>(a);
        }

        public Dictionary<string, object> Create(Sys_LanguageDto role)
        {
            var myJson = new Dictionary<string, object>();

            var dateTime = DateTime.Now;
            var roleDB = new Role() {
                Id= Guid.NewGuid(),
                CreateDate = dateTime,
                UpdateDate = dateTime,
            };

            //儲存資料

            myJson.Add("success", true);
            myJson.Add("message", "");
            return myJson;
        }

        public Dictionary<string, object> Update(Sys_LanguageDto role)
        {
            var myJson = new Dictionary<string, object>();
            //儲存資料
            myJson.Add("success", true);
            myJson.Add("message", "");
            return myJson;
        }

        public Dictionary<string, object> Delete(int id)
        {
            var myJson = new Dictionary<string, object>();

            //轉換Guid

            //刪除資料
            //var a = _repository
            //處理null狀況
            
            myJson.Add("success", true);
            myJson.Add("message", "");
            return myJson;
        }
    }
}
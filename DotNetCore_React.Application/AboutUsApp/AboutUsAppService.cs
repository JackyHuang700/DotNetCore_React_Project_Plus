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
            //12.6.1	判斷[AboutUs.Category]，一筆只會有一個[AboutUs]?

            var myJson_Return = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };

            var date = DateTime.Now;
            //主表
            var roleDB = Mapper.Map<AboutUs>(News);
            roleDB.CreateDate = date;
            roleDB.UpdateDate = date;
            _repository.Insert(roleDB);
            var aSuccess = _repository.Save() > 0;


            //副表
            if (aSuccess)
            {
                foreach (var item in News.AboutUs_LanList)
                {
                    var aa = Mapper.Map<AboutUs_Lan>(item);
                    aa.AboutUsId = roleDB.Id;
                    var aaa = _repository_lan.Insert(aa);
                }

                var bSuccess = _repository_lan.Save() == News.AboutUs_LanList.Count;

                if (bSuccess)
                {
                    myJson_Return["success"] = true;
                    myJson_Return["message"] = "";
                }
                else
                {
                    //有失敗就全部刪除
                    //刪除主表
                    _repository.Delete(roleDB);
                    _repository.Save();

                    myJson_Return["success"] = false;
                    myJson_Return["message"] = "失敗";
                }
            }

            return myJson_Return;
        }

        public Dictionary<string, object> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<AboutUsDto> GetAll()
        {
            var a = _repository.GetAllList();
            var newsDtoList = Mapper.Map<List<AboutUsDto>>(a);

            return newsDtoList;
        }

        public AboutUsDto GetSingle(string id)
        {
            //轉換Guid
            Guid guid;
            Guid.TryParse(id, out guid);
            //抓取主表
            var a = _repository.Get(guid);
            var newsDto = Mapper.Map<AboutUsDto>(a);

            return newsDto;
        }

        public Dictionary<string, object> Update(AboutUsDto News)
        {
            throw new NotImplementedException();
        }
    }
}
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
            roleDB.CreateUser = News.CreateUser;
            roleDB.CreateDate = date;
            roleDB.UpdateDate = date;
            _repository.Insert(roleDB);
            var aSuccess = _repository.Save() > 0;


            //副表
            if (aSuccess)
            {
                foreach (var item in News.LanList)
                {
                    var aa = Mapper.Map<AboutUs_Lan>(item);
                    aa.AboutUsId = roleDB.Id;
                    var aaa = _repository_lan.Insert(aa);
                }

                var bSuccess = _repository_lan.Save() == News.LanList.Count;

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
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };


            //轉換Guid
            Guid guid;
            Guid.TryParse(id, out guid);

            //刪除語言表
            //var news_LanList = _repository_lan.GetAllList(c => c.LocationId == guid);
            //_repository_lan.DeleteRange(news_LanList);
            //var news_lan_effect = _repository_lan.Save() == news_LanList.Count;


            //刪除圖表
            //var news_ImageList = _repository_image.GetAllList(c => c.LocationId == guid);
            //_repository_image.DeleteRange(news_ImageList);
            //var news_image_effect = _repository_image.Save() == news_LanList.Count;

            //刪除主表
            _repository.Delete(guid);
            var news_effect = _repository.Save() > 0;

            var success_effect = news_effect;
            myJson["success"] = success_effect;
            myJson["message"] = success_effect ? "刪除成功" : "刪除失敗";

            return myJson;
        }

        public List<AboutUsDto> GetAll()
        {
            var a = _repository.GetAllList();
            var newsDtoList = Mapper.Map<List<AboutUsDto>>(a);

            ////要撈子表
            foreach (var item in newsDtoList)
            {
                //抓取附表
                var new_lans_List = _repository_lan.GetAllList(c => c.AboutUsId == item.Id);
                item.LanList = Mapper.Map<List<AboutUs_LanDto>>(new_lans_List);
            }

            return newsDtoList;
        }

        public List<AboutUs_CategoryDto> GetAll_Category()
        {
            var a = _repository_category.GetAllList();
            var newsDtoList = Mapper.Map<List<AboutUs_CategoryDto>>(a);
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


            //抓取附表
            var new_lans_List = _repository_lan.GetAllList(c => c.AboutUsId == newsDto.Id);
            newsDto.LanList = Mapper.Map<List<AboutUs_LanDto>>(new_lans_List);

            return newsDto;
        }

        public Dictionary<string, object> Update(AboutUsDto News)
        {
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };

            //更新主表


            var newsDB = _repository.Get(News.Id);
            newsDB = Mapper.Map<AboutUsDto, AboutUs>(News, newsDB);

            newsDB.UpdateDate = DateTime.Now;
            _repository.Update(newsDB);
            var news_effect = _repository.Save() > 0;

            //更新副表
            foreach (var newsLanDTO in News.LanList)
            {
                var getLandata = _repository_lan.FirstOrDefault(o => o.Id == newsLanDTO.Id);
                getLandata = Mapper.Map<AboutUs_LanDto, AboutUs_Lan>(newsLanDTO, getLandata, opt => opt.AfterMap((dto, dest) => { dest.AboutUsId = newsDB.Id; }));
                getLandata.AboutUsId = newsDB.Id;
                _repository_lan.InsertOrUpdate(getLandata);
            }

            var news_lan_effect = _repository_lan.Save() == News.LanList.Count;

            var success_effect = news_lan_effect && news_effect;
            myJson["success"] = success_effect;
            myJson["message"] = success_effect ? "更新成功" : "更新失敗";

            return myJson;
        }
    }
}
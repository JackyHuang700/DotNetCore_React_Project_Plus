using System;
using System.Collections.Generic;
using DotNetCore_React.Application.LocationApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.ProductApp;
using System.Linq;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using DotNetCore_React.Utility;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;

namespace DotNetCore_React.Application.LocationApp
{
    public class LocationAppService : ILocationAppService
    {
        private readonly ILocationRepository _repository;
        private readonly ILocation_LanRepository _repository_lan;
        private readonly ILocation_ImageRepository _repository_image;
        private readonly IHostingEnvironment _hostEnvironment;
        private readonly GlobalConfig _config;

        public LocationAppService(ILocationRepository repository, ILocation_LanRepository repository_lan, ILocation_ImageRepository repository_image, IOptions<GlobalConfig> optionsAccessor, IHostingEnvironment hostEnvironment)
        {
            _repository = repository;
            _repository_lan = repository_lan;
            _repository_image = repository_image;

            _config = optionsAccessor.Value;

            _hostEnvironment = hostEnvironment;
        }

        public Dictionary<string, object> Create(LocationDto News)
        {
            var myJson_Return = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };


            //主表
            var date = DateTime.Now;
            var roleDB = Mapper.Map<Location>(News);
            roleDB.CreateUser = News.CreateUser;
            roleDB.CreateDate = date;
            roleDB.UpdateDate = date;
            _repository.Insert(roleDB);
            var aSuccess = _repository.Save() > 0;
            //副表
            if (aSuccess)
            {
                //語言表
                var a_DB_List = new List<Location_Lan>();
                foreach (var item in News.LanList)
                {
                    var aa = Mapper.Map<Location_Lan>(item);
                    aa.LocationId = roleDB.Id;
                    a_DB_List.Add(aa);
                    var aaa = _repository_lan.Insert(aa);
                }
                var bSuccess = _repository_lan.Save() == News.LanList.Count;

                //圖表
                var b_DB_List = new List<Location_Image>();
                foreach (var item in News.listImage)
                {
                    var aa = Mapper.Map<Location_Image>(item);
                    aa.LocationId = roleDB.Id;
                    b_DB_List.Add(aa);
                    var aaa = _repository_image.Insert(aa);
                }
                var cSuccess = _repository_image.Save() == News.listImage.Count;


                if (bSuccess && cSuccess)
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

                    //刪除副表
                    //刪除語言表
                    _repository_lan.DeleteRange(a_DB_List);
                    _repository_lan.Save();


                    //刪除圖表
                    _repository_image.DeleteRange(b_DB_List);
                    _repository_image.Save();

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

        public List<LocationDto> GetAll()
        {
            var a = _repository.GetAllList();
            var newsDtoList = Mapper.Map<List<LocationDto>>(a);

            //要撈子表
            //foreach (var item in newsDtoList)
            //{
            //    //抓取附表
            //    var new_lans_List = _repository_lan.GetAllList(c => c.LocationId == item.Id);
            //    item.Location_LanList = Mapper.Map<List<Location_LanDto>>(new_lans_List);
            //}

            return newsDtoList;
        }

        public LocationDto GetSingle(string id)
        {
            //轉換Guid
            Guid guid;
            Guid.TryParse(id, out guid);
            //抓取主表
            var a = _repository.Get(guid);
            var newsDto = Mapper.Map<LocationDto>(a);
            //抓語言表
            var new_lans_List = _repository_lan.GetAllList(c => c.LocationId == a.Id);
            newsDto.LanList = Mapper.Map<List<Location_LanDto>>(new_lans_List);
            //抓圖表
            var new_image_List = _repository_image.GetAllList(c => c.LocationId == a.Id);
            newsDto.listImage = Mapper.Map<List<Location_ImageDto>>(new_image_List);

            return newsDto;
        }

        public Dictionary<string, object> Update(LocationDto News)
        {
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };

            //更新主表
            var newsDB = _repository.Get(News.Id);
            newsDB = Mapper.Map<LocationDto, Location>(News, newsDB);

            newsDB.UpdateDate = DateTime.Now;
            _repository.Update(newsDB);
            var news_effect = _repository.Save() > 0;

            //更新副表

            //更新語系表
            foreach (var item in News.LanList)
            {
                var getLandata = _repository_lan.FirstOrDefault(o => o.LocationId == newsDB.Id && o.LanguageId == item.LanguageId && o.Id == item.Id);
                getLandata = Mapper.Map<Location_LanDto, Location_Lan>(item, getLandata, opt => opt.AfterMap((dto, dest) => { dest.LocationId = newsDB.Id; }));
                getLandata.LocationId = newsDB.Id;
                _repository_lan.InsertOrUpdate(getLandata);
            }
            var news_lan_effect = _repository_lan.Save() == News.LanList.Count;

            //更新圖表

            //移除全部重寫
            var new_image_List = _repository_image.GetAllList(c => c.LocationId == newsDB.Id);
            _repository_image.DeleteRange(new_image_List);
            _repository_image.Save();

            foreach (var item in News.listImage)
            {
                var aa = Mapper.Map<Location_Image>(item);
                aa.LocationId = newsDB.Id;
                _repository_image.InsertOrUpdate(aa);
            }
            var news_image_effect = _repository_image.Save() == News.listImage.Count;


            var success_effect = news_lan_effect && news_effect && news_image_effect;
            myJson["success"] = success_effect;
            myJson["message"] = success_effect ? "更新成功" : "更新失敗";

            return myJson;
        }
    }
}
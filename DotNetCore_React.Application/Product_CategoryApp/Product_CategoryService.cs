﻿using System;
using System.Collections.Generic;
using System.Text;
using DotNetCore_React.Application.Product_CategoryApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.Application.Product_CategoryApp
{
    public class Product_CategoryService : IProduct_CategoryService
    {
        private readonly IProduct_CategoryRepository _repository;
        private readonly IProduct_Category_LanRepository _repository_lan;


        public Product_CategoryService(IProduct_CategoryRepository repository, IProduct_Category_LanRepository repository_lan)
        {
            _repository = repository;
            repository_lan = _repository_lan;
        }

        public Dictionary<string, object> Create(Product_CategoryDto Product_CategoryDto)
        {
            var myJson_Return = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };

            var date = DateTime.Now;

            //主表
            var roleDB = Mapper.Map<Product_Category>(Product_CategoryDto);
            roleDB.CreateDate = date;
            roleDB.UpdateDate = date;
            _repository.Insert(roleDB);
            var aSuccess = _repository.Save() > 0;

            //副表
            if (aSuccess)
            {
                foreach (var item in Product_CategoryDto.Product_Category_LanList)
                {
                    var aa = Mapper.Map<Product_Category_Lan>(item);
                    aa.LanguageId = roleDB.Id;
                    var aaa = _repository_lan.Insert(aa);
                }


                var bSuccess = _repository_lan.Save() == Product_CategoryDto.Product_Category_LanList.Count;

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

        public Dictionary<string, object> Delete(int id)
        {
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };


            var news_LanList = _repository_lan.GetAllList(c => c.LanguageId == id);
            //刪除子表
            _repository_lan.DeleteRange(news_LanList);
            var news_lan_effect = _repository_lan.Save() == news_LanList.Count;

            //刪除主表
            _repository.Delete(id);
            var news_effect = _repository.Save() > 0;

            var success_effect = news_lan_effect && news_effect;
            myJson["success"] = success_effect;
            myJson["message"] = success_effect ? "刪除成功" : "刪除失敗";

            return myJson;
        }

        public List<Product_CategoryDto> GetAll()
        {
            var a = _repository.GetAllList();
            var product_CategoryList = Mapper.Map<List<Product_CategoryDto>>(a);
            //要撈子表
            foreach (var item in product_CategoryList)
            {
                //抓取附表
                var product_Category_LanList = _repository_lan.GetAllList(c => c.LanguageId == item.Id);
                item.Product_Category_LanList = Mapper.Map<List<Product_Category_LanDto>>(product_Category_LanList);
            }


            return product_CategoryList;
        }

        public Product_CategoryDto GetSingle(int id)
        {
            //抓取主表
            var a = _repository.Get(id);
            var newsDto = Mapper.Map<Product_CategoryDto>(a);
            //抓取附表
            var new_lans_List = _repository_lan.GetAllList(c => c.LanguageId == a.Id);
            newsDto.Product_Category_LanList = Mapper.Map<List<Product_Category_LanDto>>(new_lans_List);
            return newsDto;
        }

        public Dictionary<string, object> Update(Product_CategoryDto Product_CategoryDto)
        {
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };

            //更新主表
            var newsDB = _repository.Get(Product_CategoryDto.Id);
            newsDB = Mapper.Map<Product_CategoryDto, Product_Category>(Product_CategoryDto, newsDB);

            newsDB.UpdateDate = DateTime.Now;
            _repository.Update(newsDB);
            var news_effect = _repository.Save() > 0;

            //更新副表
            foreach (var newsLanDTO in Product_CategoryDto.Product_Category_LanList)
            {
                var getLandata = _repository_lan.FirstOrDefault(o => o.LanguageId == newsDB.Id && o.LanguageId == newsLanDTO.LanguageId);
                getLandata = Mapper.Map<Product_Category_LanDto, Product_Category_Lan>(newsLanDTO, getLandata, opt => opt.AfterMap((dto, dest) => { dest.LanguageId = newsDB.Id; }));
                getLandata.LanguageId = newsDB.Id;
                _repository_lan.InsertOrUpdate(getLandata);
            }

            var news_lan_effect = _repository_lan.Save() == Product_CategoryDto.Product_Category_LanList.Count;

            var success_effect = news_lan_effect && news_effect;
            myJson["success"] = success_effect;
            myJson["message"] = success_effect ? "更新成功" : "更新失敗";

            return myJson;
        }
    }
}
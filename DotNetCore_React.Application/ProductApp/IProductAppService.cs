using System;
using System.Collections.Generic;
using DotNetCore_React.Application.ProductApp.Dtos;

namespace DotNetCore_React.Application.ProductApp
{
    public interface IProductAppService
    {
        //根據帳號獲取權限
        List<ProductDto> GetAll();

        ProductDto GetSingle(string id);


        //更新使用者資料
        Dictionary<string, object> Update(ProductDto News);


        Dictionary<string, object> Create(ProductDto News);

        Dictionary<string, object> Delete(string id);
    }
}
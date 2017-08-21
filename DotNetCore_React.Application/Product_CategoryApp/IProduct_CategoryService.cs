using DotNetCore_React.Application.Product_CategoryApp.Dtos;
using System;
using System.Collections.Generic;

namespace DotNetCore_React.Application.Product_CategoryApp
{
    public interface IProduct_CategoryService
    {
        //獲取列表
        List<Product_CategoryDto> GetAll();

        //獲取單一角色
        Product_CategoryDto GetSingle(int id);

        Dictionary<string, object> Create(Product_CategoryDto Product_CategoryDto);
        Dictionary<string, object> Update(Product_CategoryDto Product_CategoryDto);

        Dictionary<string, object> Delete(int id);
    }
}

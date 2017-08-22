using System;
using System.Collections.Generic;
using DotNetCore_React.Application.ProductApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.ProductApp;
using System.Linq;


namespace DotNetCore_React.Application.ProductApp
{
    public class ProductAppService : IProductAppService
    {
        private readonly IProductRepository _repository;
        private readonly IProduct_LanRepository _repository_lan;
        private readonly IProduct_ImageRepository _repository_image;

        public ProductAppService(IProductRepository repository, IProduct_LanRepository repository_lan, IProduct_ImageRepository repository_image)
        {
            _repository = repository;
            _repository_lan = repository_lan;
            _repository_image = repository_image;
        }

        public Dictionary<string, object> Create(ProductDto News)
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, object> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<ProductDto> GetAll()
        {
            throw new NotImplementedException();
        }

        public ProductDto GetSingle(string id)
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, object> Update(ProductDto News)
        {
            throw new NotImplementedException();
        }
    }
}
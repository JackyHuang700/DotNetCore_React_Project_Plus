using System;
using System.Collections.Generic;
using DotNetCore_React.Application.LocationApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.ProductApp;
using System.Linq;


namespace DotNetCore_React.Application.LocationApp
{
    public class LocationAppService : ILocationAppService
    {
        private readonly ILocationRepository _repository;
        private readonly ILocation_LanRepository _repository_lan;
        private readonly ILocation_ImageRepository _repository_image;

        public LocationAppService(ILocationRepository repository, ILocation_LanRepository repository_lan, ILocation_ImageRepository repository_image)
        {
            _repository = repository;
            _repository_lan = repository_lan;
            _repository_image = repository_image;
        }

        public Dictionary<string, object> Create(LocationDto News)
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, object> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<LocationDto> GetAll()
        {
            throw new NotImplementedException();
        }

        public LocationDto GetSingle(string id)
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, object> Update(LocationDto News)
        {
            throw new NotImplementedException();
        }
    }
}
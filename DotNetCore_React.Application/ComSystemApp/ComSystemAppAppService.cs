using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Application.ComSystemApp.Dtos;

using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;


namespace DotNetCore_React.Application.ComSystemApp
{
    public class ComSystemAppAppService : IComSystemAppAppService
    {
        private readonly IComSystemRepository _repository;



        public ComSystemAppAppService(IComSystemRepository repository) {
            _repository = repository;

        }
    }
}

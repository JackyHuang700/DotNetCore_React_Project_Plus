﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 產品模組
    /// </summary>
    public class Product_Lan : Entity
    {
        public Guid Id { get; set; }
        public Guid LanguageId { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }        
    }
}
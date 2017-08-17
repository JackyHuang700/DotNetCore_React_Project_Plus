using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.Sys_LanguageApp.Dtos
{
    /// <summary>
    /// 語系設定
    /// </summary>
    public class Sys_LanguageDto
    {
        /// <summary>
        /// 型態為Int如何處理
        /// </summary>
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDisplay { get; set; }


    }
}

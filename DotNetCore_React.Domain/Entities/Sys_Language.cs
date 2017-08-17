using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Domain.Entities
{
    /// <summary>
    /// 語系設定
    /// </summary>
    public class Sys_Language : Entity_Int
    {
        public string Name { get; set; }

        public bool IsDisplay { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Utility
{
    public class GlobalConfig
    {
        /// <summary>
        /// 站台位置
        /// </summary>
        public string DOMAIN { get; set; }

        /// <summary>
        /// 郵件服務位置
        /// </summary>
        public string SMTP_ADDRESS { get; set; }

        /// <summary>
        /// 郵件服務端口
        /// </summary>
        public int SMTP_PORT { get; set; }
    }
}

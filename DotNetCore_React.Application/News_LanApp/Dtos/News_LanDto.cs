using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetCore_React.Application.News_LanApp.Dtos
{
    public class News_LanDto
    {
        public Guid Id { get; set; }

        public Guid NewsId { get; set; }
        public int LanguageId { get; set; }

        public string Title { get; set; }

        public string SubTitle { get; set; }
        public string Content { get; set; }
    }
}

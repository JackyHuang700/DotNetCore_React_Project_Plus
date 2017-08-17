using System;
using System.Collections.Generic;
using System.Text;

using DotNetCore_React.Utility.Interface;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Options;

namespace DotNetCore_React.Utility.Services
{
    public class LocalMailServices : IMailServices
    {
        private MailboxAddress _SENT_FROM = new MailboxAddress("Admin", "test@website.com");

        private readonly GlobalConfig _config;

        protected MimeMessage _Message { set; get; }


        public LocalMailServices(IOptions<GlobalConfig> optionsAccessor) {
            _config = optionsAccessor.Value;
            _Message = new MimeMessage();
            _Message.From.Add(_SENT_FROM);
        }

        public void AddTo(string name,string mail)
        {
            _Message.To.Add(new MailboxAddress(name, mail));
        }

        public void Sent(string subject,string body)
        {
            _Message.Subject = subject;
            _Message.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = body.Replace("$Domain$", _config.DOMAIN)
            };

            using (var client = new SmtpClient())
            {
                // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                client.Connect(_config.SMTP_ADDRESS, _config.SMTP_PORT, false);

                // Note: since we don't have an OAuth2 token, disable
                // the XOAUTH2 authentication mechanism.
                client.AuthenticationMechanisms.Remove("XOAUTH2");

                // Note: only needed if the SMTP server requires authentication
                //client.Authenticate("username", "password");

                client.Send(_Message);
                client.Disconnect(true);
            }
        }

    }
}

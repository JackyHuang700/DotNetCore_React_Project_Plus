using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using MailKit.Net.Smtp;
using MimeKit;

namespace DotNetCore_React.Utility.Interface
{
    public interface IMailServices
    {
        string _body { get; set; }
        string _subject { get; set; }

        /// <summary>
        /// 新增附件
        /// </summary>
        /// <param name="path">本地檔案路徑</param>
        void AddAttachments(string path);

        /// <summary>
        /// 新增附件
        /// </summary>
        /// <param name="file">Bytes</param>
        /// <param name="fileName">檔案名稱</param>
        void AddAttachments(byte[] file, string fileName);

        /// <summary>
        /// 新增附件
        /// </summary>
        /// <param name="file">Stream</param>
        /// <param name="fileName">檔案名稱</param>
        void AddAttachments(Stream file, string fileName);

        /// <summary>
        /// 新增接收者
        /// </summary>
        /// <param name="someone">接收者資訊</param>
        //void AddReceiver(MailAddress someone);

        /// <summary>
        /// 新增接收者
        /// </summary>
        /// <param name="someone">接收者列表</param>
        void AddReceiver(List<string> someone);

        /// <summary>
        /// 新增接收者
        /// </summary>
        /// <param name="someone">接受者資訊列表</param>
        //void AddReceiver(List<MailAddress> someone);

        /// <summary>
        /// 傳送
        /// </summary>
        /// <returns></returns>
        bool Sent();

        /// <summary>
        /// 設定信件內容
        /// </summary>
        /// <param name="str"></param>
        void SetBody(string str);

        /// <summary>
        /// 設定標題
        /// </summary>
        /// <param name="str"></param>
        void SetSubject(string str);
    }
}

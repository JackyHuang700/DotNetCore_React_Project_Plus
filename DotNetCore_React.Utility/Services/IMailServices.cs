namespace DotNetCore_React.Utility.Services
{
    public interface IMailServices
    {
        void AddTo(string name, string mail);
        void Sent(string subject, string body);
    }
}
using System;
using System.Security.Cryptography;
using System.Text;

namespace DotNetCore_React.Utility
{
    public static class HashHelper
    {
        public static string CreateSHA256(string str)
        {
            // SHA256 is disposable by inheritance.  
            using (var sha256 = SHA256.Create())
            {
                // Send a sample text to hash.  
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(str));
                // Get the hashed string.  
                var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();

                return hash;
            }
        }
    }
}
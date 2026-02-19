using System.Security.Cryptography;
using System.Text;

namespace AssistMate.Application.Common.Security
{
    public static class OtpHasher
    {
        public static string Hash(string otp)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(otp);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}
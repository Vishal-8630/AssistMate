namespace AssistMate.Application.Auth.DTOs
{
    public class VerifyOtpRequest
    {
        public string PhoneNumber { get; set; } = default;
        public string Otp { get; set; } = default;
    }
}
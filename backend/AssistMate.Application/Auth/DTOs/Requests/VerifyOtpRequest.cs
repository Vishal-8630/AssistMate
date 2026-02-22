namespace AssistMate.Application.Auth.DTOs.Requests
{
    public record VerifyOtpRequest(string PhoneNumber, string Otp);
}
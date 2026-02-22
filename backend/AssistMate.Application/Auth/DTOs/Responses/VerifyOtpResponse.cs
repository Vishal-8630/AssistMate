using AssistMate.Application.Users.DTOs;

namespace AssistMate.Application.Auth.DTOs.Responses
{
    public record VerifyOtpResponse(string AccessToken, string RefreshToken, UserDto User);
}
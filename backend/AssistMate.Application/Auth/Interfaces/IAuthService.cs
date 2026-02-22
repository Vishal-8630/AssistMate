using AssistMate.Application.Auth.DTOs.Requests;
using AssistMate.Application.Auth.DTOs.Responses;
using AssistMate.Application.Auth.Responses;

namespace AssistMate.Application.Auth.Interfaces
{
    public interface IAuthService
    {
        Task<SendOtpResponse> SendOtpAsync(SendOtpRequest request);
        Task<VerifyOtpResponse> VerifyOtpAsync(VerifyOtpRequest request);
        Task<RefreshTokenResponse> RefreshTokenAsync(string refreshToken);
        Task LogoutAsync(string refreshToken);
    }
}
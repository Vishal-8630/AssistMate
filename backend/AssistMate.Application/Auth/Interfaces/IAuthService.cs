using AssistMate.Application.Auth.DTOs;
using AssistMate.Application.Auth.Responses;

namespace AssistMate.Application.Auth.Interfaces
{
    public interface IAuthService
    {
        Task SendOtpAsync(SendOtpRequest request);
        Task<AuthResponse> VerifyOtpAsync(VerifyOtpRequest request);
        Task<AuthResponse> RefreshTokenAsync(string refreshToken);
        Task LogoutAsync(string refreshToken);
    }
}
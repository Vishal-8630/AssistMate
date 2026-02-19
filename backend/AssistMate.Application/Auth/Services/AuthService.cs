using AssistMate.Application.Auth.DTOs;
using AssistMate.Application.Auth.Interfaces;
using AssistMate.Application.Auth.Responses;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Common.Security;
using AssistMate.Application.Common.Exceptions;
using AssistMate.Domain.Entities;
using AssistMate.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Auth.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAppDbContext _dbContext;
        private readonly IJwtService _jwtService;

        public AuthService(IAppDbContext dbContext, IJwtService jwtService)
        {
            _dbContext = dbContext;
            _jwtService = jwtService;
        }

        public async Task SendOtpAsync(SendOtpRequest request)
        {
            var otp = Random.Shared.Next(100000, 999999).ToString();
            var otpHash = OtpHasher.Hash(otp);

            var otpEntity = new OtpVerification
            {
                Id = Guid.NewGuid(),
                PhoneNumber = request.PhoneNumber,
                OtpHash = otpHash,
                ExpiresAt = DateTime.UtcNow.AddMinutes(5),
                CreatedAt = DateTime.UtcNow,
                IsUsed = false,
                AttemptCount = 0
            };

            _dbContext.OtpVerifications.Add(otpEntity);
            await _dbContext.SaveChangesAsync();

            Console.WriteLine($"DEBUG OTP: {otp}");
        }

        public async Task<AuthResponse> VerifyOtpAsync(VerifyOtpRequest request)
        {
            var otpRecord = await _dbContext.OtpVerifications
                .Where(x => x.PhoneNumber == request.PhoneNumber && !x.IsUsed)
                .OrderByDescending(x => x.ExpiresAt)
                .FirstOrDefaultAsync();

            if (otpRecord == null)
                throw new AppException("Invalid OTP.", 400);

            if (otpRecord.ExpiresAt < DateTime.UtcNow)
                throw new AppException("OTP expired.", 400);

            otpRecord.AttemptCount++;
            if (otpRecord.AttemptCount > 3)
            {
                await _dbContext.SaveChangesAsync();
                throw new AppException("Too many attempts. Request new OTP.", 400);
            }

            var inputHash = OtpHasher.Hash(request.Otp);

            if (otpRecord.OtpHash != inputHash)
            {
                await _dbContext.SaveChangesAsync();
                throw new AppException("Incorrect OTP.", 400);
            }

            otpRecord.IsUsed = true;

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.PhoneNumber == request.PhoneNumber);

            if (user == null)
            {
                user = new User
                {
                    Id = Guid.NewGuid(),
                    PhoneNumber = request.PhoneNumber,
                    Role = UserRole.Client,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _dbContext.Users.Add(user);
            }

            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            var refreshTokenEntity = new RefreshToken
            {
                Token = refreshToken,
                UserId = user.Id,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                IsRevoked = false,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.RefreshTokens.Add(refreshTokenEntity);
            await _dbContext.SaveChangesAsync();

            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthResponse> RefreshTokenAsync(string refreshToken)
        {
            var storedToken = await _dbContext.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (storedToken == null || storedToken.IsRevoked || storedToken.ExpiresAt < DateTime.UtcNow)
            {
                throw new AppException("Invalid refresh token", 401);
            }

            storedToken.IsRevoked = true;

            var newAccessToken = _jwtService.GenerateAccessToken(storedToken.User);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            var newRefreshEntity = new RefreshToken
            {
                Token = newRefreshToken,
                UserId = storedToken.UserId,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                IsRevoked = false,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.RefreshTokens.Add(newRefreshEntity);
            await _dbContext.SaveChangesAsync();

            return new AuthResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public async Task LogoutAsync(string refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
                throw new AppException("No refresh token", 400);

            var storedToken = await _dbContext.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (storedToken != null)
            {
                storedToken.IsRevoked = true;
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
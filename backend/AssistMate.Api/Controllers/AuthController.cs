using Microsoft.AspNetCore.Mvc;
using AssistMate.Infrastructure.Data;
using AssistMate.Application.Auth.DTOs;
using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using AssistMate.Application.Common.Security;
using AssistMate.Application.Common.Interfaces;

namespace AssistMate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IJwtService _jwtService;

        public AuthController(AppDbContext context, IJwtService jwtService)
        {
            _dbContext = context;
            _jwtService = jwtService;
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request)
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
                IsUsed = false
            };

            _dbContext.OtpVerifications.Add(otpEntity);
            await _dbContext.SaveChangesAsync();

            // TODO: Send actual SMS
            Console.WriteLine($"DEBUG OTP: {otp}");

            return Ok(new { message = "OTP send successfully" });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            var otpRecord = await _dbContext.OtpVerifications
                .Where(x => x.PhoneNumber == request.PhoneNumber && !x.IsUsed && x.ExpiresAt > DateTime.UtcNow)
                .OrderByDescending(x => x.ExpiresAt)
                .FirstOrDefaultAsync();

            if (otpRecord == null)
                return BadRequest("Invalid OTP.");

            if (otpRecord.ExpiresAt < DateTime.UtcNow)
                return BadRequest("OTP expired.");

            otpRecord.AttemptCount++;
            if (otpRecord.AttemptCount > 3)
            {
                await _dbContext.SaveChangesAsync();
                return BadRequest("Too many attempts. Request new OTP.");
            }

            var inputHash = OtpHasher.Hash(request.Otp);

            if (otpRecord.OtpHash != inputHash)
            {
                await _dbContext.SaveChangesAsync();
                return BadRequest("Incorrect OTP.");
            }

            otpRecord.IsUsed = true;
            await _dbContext.SaveChangesAsync();

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.PhoneNumber == request.PhoneNumber);

            if (user == null)
            {
                user = new User
                {
                    Id = Guid.NewGuid(),
                    PhoneNumber = request.PhoneNumber,
                    Role = Domain.Enums.UserRole.Client,
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

            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // true in production (https)
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok(new
            {
                accessToken
            });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("No refresh token");

            var storedToken = await _dbContext.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (storedToken == null || storedToken.IsRevoked || storedToken.ExpiresAt < DateTime.UtcNow)
            {
                return Unauthorized("Invalid refresh token");
            }

            // Revoked old refresh token
            storedToken.IsRevoked = true;

            // Generate new tokens
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

            Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok(new
            {
                accessToken = newAccessToken
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (!string.IsNullOrEmpty(refreshToken))
            {
                var storedToken = await _dbContext.RefreshTokens
                    .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

                if (storedToken != null)
                {
                    storedToken.IsRevoked = true;
                    await _dbContext.SaveChangesAsync();
                }
            }

            // Clear cookie
            Response.Cookies.Delete("refreshToken");

            return Ok();
        }

        [HttpGet("test-db")]
        public IActionResult TestDb()
        {
            var userCount = _dbContext.Users.Count();
            return Ok(new { UsersInDatabase = userCount });
        }
    }
}
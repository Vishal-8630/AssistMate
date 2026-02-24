using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Common.Mappings;
using AssistMate.Application.Users.DTOs;
using AssistMate.Application.Users.Interfaces;
using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Users.Services
{
    public class UserService : IUserService
    {
        private readonly IAppDbContext _dbContext;
        private readonly IJwtService _jwtService;

        public UserService(IAppDbContext dbContext, IJwtService jwtService)
        {
            _dbContext = dbContext;
            _jwtService = jwtService;
        }

        public async Task<UpdateProfileResponse> UpdateProfileAsync(Guid userId, UpdateProfileRequest request)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
                throw new AppException("User not found", 404);

            user.FirstName = request.FirstName.Trim();
            user.LastName = request.LastName.Trim();
            user.IsProfileCompleted = true;

            user.Email = string.IsNullOrWhiteSpace(request.Email)
                ? null
                : request.Email.Trim();

            user.Role = request.Role;
            user.UpdatedAt = DateTime.UtcNow;

            await _dbContext.RefreshTokens
                .Where(t => t.UserId == user.Id && !t.IsRevoked)
                .ExecuteUpdateAsync(setters => setters
                .SetProperty(t => t.IsRevoked, true)
            );

            var newAccessToken = _jwtService.GenerateAccessToken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            var refreshTokenEntity = new RefreshToken
            {
                Token = newRefreshToken,
                UserId = user.Id,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                IsRevoked = false,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.RefreshTokens.Add(refreshTokenEntity);
            await _dbContext.SaveChangesAsync();

            return new UpdateProfileResponse(AccessToken: newAccessToken, RefreshToken: newRefreshToken, User: user.ToDto());
        }

        public async Task<GetUserByIdResponse> GetUserByIdAsync(Guid userId)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
                throw new AppException("Unauthorized", 401);

            return new GetUserByIdResponse(User: user.ToDto());
        }
    }
}
using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Common.Mappings;
using AssistMate.Application.Users.DTOs;
using AssistMate.Application.Users.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Users.Services
{
    public class UserService : IUserService
    {
        private readonly IAppDbContext _dbContext;

        public UserService(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
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

            await _dbContext.SaveChangesAsync();

            return new UpdateProfileResponse(user.ToDto());
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
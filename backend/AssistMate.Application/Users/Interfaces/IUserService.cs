using AssistMate.Application.Users.DTOs;

namespace AssistMate.Application.Users.Interfaces
{
    public interface IUserService
    {
        Task<UpdateProfileResponse> UpdateProfileAsync(Guid userId, UpdateProfileRequest request);
        Task<GetUserByIdResponse> GetUserByIdAsync(Guid userId);
    }
}
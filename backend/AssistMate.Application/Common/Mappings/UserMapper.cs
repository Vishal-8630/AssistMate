using AssistMate.Domain.Entities;
using AssistMate.Application.Users.DTOs;

namespace AssistMate.Application.Common.Mappings
{
    public static class UserMapper
    {
        public static UserDto ToDto(this User user)
        {
            return new UserDto(
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                user.PhoneNumber,
                user.Role.ToString(),
                user.IsActive,
                user.IsProfileCompleted,
                user.CreatedAt,
                user.UpdatedAt
            );
        }
    }
}
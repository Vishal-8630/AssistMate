using AssistMate.Domain.Enums;

namespace AssistMate.Application.Users.DTOs
{
    public record UpdateProfileRequest(
        string FirstName,
        string LastName,
        string? Email,
        UserRole Role
    );
}
namespace AssistMate.Application.Users.DTOs
{
    public record UserDto(
        Guid Id,
        string? FirstName,
        string? LastName,
        string? Email,
        string PhoneNumber,
        string Role,
        bool IsActive,
        bool IsProfileCompleted,
        DateTime CreatedAt,
        DateTime UpdatedAt
    );
}
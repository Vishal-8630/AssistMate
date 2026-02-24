namespace AssistMate.Application.Services.DTOs
{
    public record AssistantProfileDto(
        Guid Id,
        string? FirstName,
        string? LastName,
        List<ServiceDto> Services
    );
}
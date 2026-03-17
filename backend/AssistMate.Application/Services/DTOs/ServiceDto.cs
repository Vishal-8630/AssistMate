using AssistMate.Domain.Enums;

namespace AssistMate.Application.Services.DTOs
{
    public record ServiceDto(Guid Id, string Name, string? Description, decimal Price, ServiceCategory Category);
}
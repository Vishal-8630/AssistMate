using AssistMate.Domain.Enums;

namespace AssistMate.Application.Notifications.DTOs
{
    public record NotificationDto(
        Guid Id,
        string Title,
        string Message,
        bool IsRead,
        DateTime CreatedAt,
        NotificationType Type,
        Guid? RelatedEntityId
    );
}
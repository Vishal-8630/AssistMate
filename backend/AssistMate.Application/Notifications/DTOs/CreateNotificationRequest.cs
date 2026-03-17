using AssistMate.Domain.Enums;

namespace AssistMate.Application.Notifications.DTOs
{
    public record CreateNotificationRequest(
        Guid UserId,
        string Title,
        string Message,
        NotificationType Type,
        Guid? RelatedEntityId
    );
}
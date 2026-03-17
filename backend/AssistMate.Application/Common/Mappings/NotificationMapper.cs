using AssistMate.Application.Notifications.DTOs;
using AssistMate.Domain.Entities;

namespace AssistMate.Application.Common.Mappings
{
    public static class NotificationMapper
    {
        public static NotificationDto ToNotificationDto(this Notification notification)
        {
            return new NotificationDto(
                notification.Id,
                notification.Title,
                notification.Message,
                notification.IsRead,
                notification.CreatedAt,
                notification.Type,
                notification.RelatedEntityId
            );
        }
    }
}
using AssistMate.Application.Notifications.DTOs;

namespace AssistMate.Application.Common.Interfaces
{
    public interface INotificationRealtime
    {
        Task SendAsync(Guid userId, NotificationDto notification);
    }
}
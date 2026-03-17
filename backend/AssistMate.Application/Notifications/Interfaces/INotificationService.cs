using AssistMate.Application.Notifications.DTOs;

namespace AssistMate.Application.Notifications.Interfaces
{
    public interface INotificationService
    {
        Task CreateNotificationAsync(CreateNotificationRequest request);
        Task<List<NotificationDto>> GetUserNotificationsAsync(Guid userId);
        Task MarkAsReadAsync(Guid notificationId, Guid userId);
    }
}
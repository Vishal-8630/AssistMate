using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Common.Mappings;
using AssistMate.Application.Notifications.DTOs;
using AssistMate.Application.Notifications.Interfaces;
using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Notifications.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IAppDbContext _dbContext;
        private readonly INotificationRealtime _notificationRealtime;

        public NotificationService(IAppDbContext dbContext, INotificationRealtime notificationRealtime)
        {
            _dbContext = dbContext;
            _notificationRealtime = notificationRealtime;
        }

        public async Task CreateNotificationAsync(CreateNotificationRequest request)
        {
            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                Title = request.Title,
                Message = request.Message,
                Type = request.Type,
                RelatedEntityId = request.RelatedEntityId,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            _dbContext.Notifications.Add(notification);
            await _dbContext.SaveChangesAsync();
            await _notificationRealtime.SendAsync(request.UserId, notification.ToNotificationDto());
        }

        public async Task<List<NotificationDto>> GetUserNotificationsAsync(Guid userId)
        {
            return await _dbContext.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => n.ToNotificationDto())
                .ToListAsync();
        }

        public async Task MarkAsReadAsync(Guid notificationId, Guid userId)
        {
            var notification = await _dbContext.Notifications
                .FirstOrDefaultAsync(n => n.Id == notificationId && n.UserId == userId);

            if (notification == null)
                return;

            notification.IsRead = true;
            await _dbContext.SaveChangesAsync();
        }
    }
}
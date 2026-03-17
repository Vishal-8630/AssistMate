using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Notifications.DTOs;
using AssistMate.Infrastructure.Realtime;
using Microsoft.AspNetCore.SignalR;

namespace AssistMate.Infrastructure.Services
{
    public class NotificationRealtime : INotificationRealtime
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationRealtime(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task SendAsync(Guid userId, NotificationDto notification)
        {
            await _hubContext.Clients.User(userId.ToString()).SendAsync("ReceiveNotification", notification);
        }
    }
}
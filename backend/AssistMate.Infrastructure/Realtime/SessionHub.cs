using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Notifications.DTOs;
using AssistMate.Application.Notifications.Interfaces;
using AssistMate.Domain.Entities;
using AssistMate.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;
using System.Security.Claims;

namespace AssistMate.Infrastructure.Realtime
{
    [Authorize]
    public class SessionHub : Hub
    {
        private readonly IAppDbContext _dbContext;
        private readonly IPresenceTracker _presenceTracker;
        private readonly ISessionAuthorizationService _sessionAuth;
        private readonly INotificationService _notificationService;

        public SessionHub(IAppDbContext dbContext, IPresenceTracker presenceTracker, ISessionAuthorizationService sessionAuth, INotificationService notificationService)
        {
            _dbContext = dbContext;
            _presenceTracker = presenceTracker;
            _sessionAuth = sessionAuth;
            _notificationService = notificationService;
        }

        public override async Task OnConnectedAsync()
        {
            var userIdString = Context.User?
                .FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (Guid.TryParse(userIdString, out var userId))
            {
                var isFirstConnection = _presenceTracker.UserConnected(userId, Context.ConnectionId);
                if (isFirstConnection)
                {
                    await Clients.All.SendAsync("UserOnline", userId);
                }
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userIdString = Context.User?
                .FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (Guid.TryParse(userIdString, out var userId))
            {
                var fullyOffline = _presenceTracker.UserDisconnected(userId, Context.ConnectionId);

                if (fullyOffline)
                {
                    await Clients.All.SendAsync("UserOffline", userId);
                }
            }
            Console.WriteLine($"User {userId} DISCONNECTED");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task JoinSession(Guid sessionId)
        {
            var userIdString = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdString, out var userId))
                return;

            var isParticipant = await _sessionAuth.IsUserParticipantAsync(sessionId, userId);

            if (!isParticipant)
                return;

            var groupName = GetSessionGroup(sessionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.OthersInGroup(groupName)
                .SendAsync("UserOnline", userId);

            var onlineUsers = _presenceTracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("InitialOnlineUsers", onlineUsers);
        }

        public async Task LeaveSession(Guid sessionId)
        {
            var groupName = GetSessionGroup(sessionId);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task SendMessage(Guid sessionId, string content, Guid? parentMessageId = null)
        {
            var userIdString = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdString, out var userId))
                throw new HubException("Unauthorized");

            if (string.IsNullOrWhiteSpace(content))
                throw new HubException("Message cannot be empty");

            var isParticipant = await _sessionAuth.IsUserParticipantAsync(sessionId, userId);

            if (!isParticipant)
                return;

            var isActive = await _sessionAuth.IsSessionActiveAsync(sessionId);

            if (!isActive)
                return;

            if (content.Length > 2000)
                throw new HubException("Message too long");

            // Validate session ownership
            var session = await _dbContext.Sessions
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == sessionId, Context.ConnectionAborted);

            if (session == null)
                throw new HubException("Session not found");

            if (session.ClientId != userId && session.AssistantId != userId)
                throw new HubException("Not authorized for this session");

            if (session.Status != SessionStatus.Active)
                throw new HubException("Session is not active");

            // Validate parent message if provided
            SessionMessage? parentMessage = null;
            if (parentMessageId.HasValue)
            {
                parentMessage = await _dbContext.SessionMessages
                    .AsNoTracking()
                    .FirstOrDefaultAsync(m => m.Id == parentMessageId.Value && m.SessionId == sessionId);
                
                if (parentMessage == null)
                    throw new HubException("Parent message not found");
            }

            var message = new SessionMessage
            {
                Id = Guid.NewGuid(),
                SessionId = sessionId,
                SenderId = userId,
                Content = content.Trim(),
                CreatedAt = DateTime.UtcNow,
                ParentMessageId = parentMessageId
            };

            _dbContext.SessionMessages.Add(message);
            await _dbContext.SaveChangesAsync(Context.ConnectionAborted);

            var groupName = GetSessionGroup(sessionId);

            var receiverId = session.ClientId == userId
                ? session.AssistantId
                : session.ClientId;

            if (receiverId != userId)
            {
                await _notificationService.CreateNotificationAsync(
                    new CreateNotificationRequest(receiverId, "New Message", "You received a new message", NotificationType.NewMessage, sessionId)
                );
            }

            await Clients.Group(groupName).SendAsync("ReceiveMessage", new
            {
                message.Id,
                message.SessionId,
                message.SenderId,
                message.Content,
                message.CreatedAt,
                message.ParentMessageId,
                ParentMessage = parentMessage != null ? new {
                    parentMessage.Id,
                    parentMessage.Content,
                    parentMessage.SenderId
                } : null
            });
        }

        public async Task Typing(Guid sessionId)
        {
            var userIdString = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdString, out var userId))
                return;

            var groupName = GetSessionGroup(sessionId);

            await Clients.OthersInGroup(groupName)
                .SendAsync("UserTyping", userId);
        }

        public async Task SendReaction(Guid sessionId, Guid messageId, string emoji)
        {
            var userIdString = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdString, out var userId))
                throw new HubException("Unauthorized");

            var isParticipant = await _sessionAuth.IsUserParticipantAsync(sessionId, userId);
            if (!isParticipant) return;

            var message = await _dbContext.SessionMessages
                .FirstOrDefaultAsync(m => m.Id == messageId && m.SessionId == sessionId);

            if (message == null)
                throw new HubException("Message not found");

            var existingReaction = await _dbContext.MessageReactions
                .FirstOrDefaultAsync(r => r.MessageId == messageId && r.UserId == userId);

            if (existingReaction != null)
            {
                if (existingReaction.Emoji == emoji)
                {
                    _dbContext.MessageReactions.Remove(existingReaction);
                }
                else
                {
                    existingReaction.Emoji = emoji;
                }
            }
            else
            {
                var reaction = new MessageReaction
                {
                    Id = Guid.NewGuid(),
                    MessageId = messageId,
                    UserId = userId,
                    Emoji = emoji,
                    CreatedAt = DateTime.UtcNow
                };
                _dbContext.MessageReactions.Add(reaction);
            }

            await _dbContext.SaveChangesAsync();

            var reactions = await _dbContext.MessageReactions
                .Where(r => r.MessageId == messageId)
                .Select(r => new { userId = r.UserId, emoji = r.Emoji })
                .ToListAsync();

            var groupName = GetSessionGroup(sessionId);
            await Clients.Group(groupName).SendAsync("ReceiveReaction", messageId, reactions);
        }

        public async Task MarkAsRead(Guid sessionId)
        {
            var userIdString = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdString, out var userId))
                return;

            var isParticipant = await _sessionAuth.IsUserParticipantAsync(sessionId, userId);

            if (!isParticipant)
                return;

            var isActive = await _sessionAuth.IsSessionActiveAsync(sessionId);

            if (!isActive)
                return;

            var unreadMessages = await _dbContext.SessionMessages
                .Where(m => m.SessionId == sessionId && m.SenderId != userId && m.ReadAt == null)
                .ToListAsync();

            foreach (var message in unreadMessages)
            {
                message.ReadAt = DateTime.UtcNow;
            }

            await _dbContext.SaveChangesAsync();

            var groupName = GetSessionGroup(sessionId);

            await Clients.Group(groupName)
                .SendAsync("MessagesRead", sessionId, userId);
        }

        private static string GetSessionGroup(Guid sessionId)
        {
            return $"session-{sessionId}";
        }
    }
}
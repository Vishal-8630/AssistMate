using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Notifications.DTOs;
using AssistMate.Application.Notifications.Interfaces;
using AssistMate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.Commands.CompleteSession
{
    public class CompleteSessionHandler : IRequestHandler<CompleteSessionCommand>
    {
        private readonly IAppDbContext _dbContext;
        private readonly ICurrentUserService _currentUser;
        private readonly INotificationService _notificationService;

        public CompleteSessionHandler(IAppDbContext dbContext, ICurrentUserService currentUser, INotificationService notificationService)
        {
            _dbContext = dbContext;
            _currentUser = currentUser;
            _notificationService = notificationService;
        }

        public async Task Handle(CompleteSessionCommand request, CancellationToken cancellationToken)
        {
            var session = await _dbContext.Sessions
                .FirstOrDefaultAsync(s => s.Id == request.SessionId, cancellationToken);

            if (session == null)
                throw new AppException("Session not found");

            if (session.Status != SessionStatus.Active)
                throw new AppException("Session is not active");

            if (session.ClientId != _currentUser.UserId)
                throw new AppException("Only client can complete this session");

            session.Status = SessionStatus.Completed;
            session.CompletedAt = DateTime.UtcNow;

            var receiverId = session.ClientId == _currentUser.UserId
                ? session.AssistantId
                : session.ClientId;

            if (receiverId != _currentUser.UserId)
            {
                await _notificationService.CreateNotificationAsync(
                    new CreateNotificationRequest(receiverId, "Session Completed", "A session has been completed", NotificationType.SessionCompleted, session.Id)
                );
            }
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
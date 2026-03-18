using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Notifications.DTOs;
using AssistMate.Application.Notifications.Interfaces;
using AssistMate.Domain.Entities;
using AssistMate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.Commands.CreateSession
{
    public class CreateSessionHandler : IRequestHandler<CreateSessionCommand, CreateSessionResponse>
    {
        private readonly IAppDbContext _dbContext;
        private readonly INotificationService _notificationService;

        public CreateSessionHandler(IAppDbContext dbContext, INotificationService notificationService)
        {
            _dbContext = dbContext;
            _notificationService = notificationService;
        }

        public async Task<CreateSessionResponse> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
        {
            var assistant = await _dbContext.Users
                .Include(u => u.AssistantServices)
                .FirstOrDefaultAsync(u => u.Id == request.AssistantId && u.Role == UserRole.Assistant, cancellationToken);

            var service = await _dbContext.Services
                .FirstOrDefaultAsync(s => s.Id == request.ServiceId, cancellationToken);

            if (service == null || !service.IsActive)
                throw new AppException("Service not found", 404);

            if (assistant == null)
                throw new AppException("Assistant not found", 404);

            var providesService = assistant.AssistantServices
                .Any(x => x.ServiceId == request.ServiceId);

            if (!providesService)
                throw new AppException("Assistant does not provide the service.");

            var session = new Session()
            {
                Id = Guid.NewGuid(),
                ClientId = request.ClientId,
                AssistantId = request.AssistantId,
                ServiceId = request.ServiceId,
                Status = SessionStatus.Requested,
                Amount = service.Price,
                PaymentStatus = PaymentStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.Sessions.Add(session);

            try
            {
                await _dbContext.SaveChangesAsync(cancellationToken);
            }
            catch (DbUpdateException)
            {
                throw new AppException("An active or pending session already exists."); 
            }

            await _notificationService.CreateNotificationAsync(
                new CreateNotificationRequest(request.AssistantId, "New Session Request", "A client has requested a session", NotificationType.SessionCreated, session.Id)
            );
            return new CreateSessionResponse(SessionId: session.Id, Status: session.Status.ToString());
        }
    }
}
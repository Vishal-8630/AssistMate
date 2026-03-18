using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Notifications.DTOs;
using AssistMate.Application.Notifications.Interfaces;
using AssistMate.Application.Payments.Interfaces;
using AssistMate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.Commands.AcceptSession
{
    public class AcceptSessionHandler : IRequestHandler<AcceptSessionCommand, AcceptSessionResponse>
    {
        private readonly IAppDbContext _dbContext;
        private readonly INotificationService _notificationService;
        private readonly IPaymentService _paymentService;

        public AcceptSessionHandler(IAppDbContext dbContext, INotificationService notificationService, IPaymentService paymentService)
        {
            _dbContext = dbContext;
            _notificationService = notificationService;
            _paymentService = paymentService;
        }

        public async Task<AcceptSessionResponse> Handle(AcceptSessionCommand request, CancellationToken cancellationToken)
        {
            var session = await _dbContext.Sessions
                .FirstOrDefaultAsync(x => x.Id == request.SessionId, cancellationToken);

            if (session == null)
                throw new AppException("Session not found", 404);

            if (session.AssistantId != request.AssistantId)
                throw new AppException("Unauthorized to accept this session");

            if (session.Status != SessionStatus.Requested)
                throw new AppException("Session cannot be accepted");

            session.Status = SessionStatus.PendingPayment;
            session.AcceptedAt = DateTime.UtcNow;

            var paymentResult = await _paymentService.CreatePaymentAsync(session.Id, session.ClientId, session.Amount);

            await _dbContext.SaveChangesAsync(cancellationToken);

            await _notificationService.CreateNotificationAsync(
                new CreateNotificationRequest(session.ClientId, "Session Accepted", "Assistant has accepted your session. Please complete payment to start", NotificationType.SessionAccepted, session.Id)
            );
            return new AcceptSessionResponse(SessionId: session.Id, session.Status.ToString(), paymentResult.OrderId, paymentResult.Amount, paymentResult.Currency);
        }
    }
}
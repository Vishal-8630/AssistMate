using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Payments.Interfaces;
using AssistMate.Application.Sessions.Commands.CreateSession;
using AssistMate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.Commands.StartSession
{
    public class StartSessionHandler : IRequestHandler<StartSessionCommand, StartSessionResponse>
    {
        private readonly IAppDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IPaymentService _paymentService;

        public StartSessionHandler(IAppDbContext dbContext, IMediator mediator, IPaymentService paymentService)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _paymentService = paymentService;
        }

        public async Task<StartSessionResponse> Handle(StartSessionCommand request, CancellationToken cancellationToken)
        {
            var session = await _dbContext.Sessions
                .FirstOrDefaultAsync(s => s.Id == request.SessionId, cancellationToken);

            if (session == null)
                throw new AppException("Session not found", 404);

            if (session.ClientId != request.ClientId)
                throw new AppException("Unauthorized");

            if (session.PaymentStatus == PaymentStatus.Paid)
                throw new AppException("Session already paid");

            if (session.Status != SessionStatus.PendingPayment)
                throw new AppException("Session is not ready for payment");

            await _paymentService.VerifyAndCompletePaymentAsync(session.Id, request.RazorpayOrderId, request.RazorpayPaymentId, request.RazorpaySignature);

            session.PaymentStatus = PaymentStatus.Paid;
            session.Status = SessionStatus.Active;

            await _dbContext.SaveChangesAsync(cancellationToken);
            return new StartSessionResponse(session.Id);
        }
    }
}
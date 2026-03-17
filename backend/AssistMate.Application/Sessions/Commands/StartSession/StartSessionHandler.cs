using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
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

        public StartSessionHandler(IAppDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<StartSessionResponse> Handle(StartSessionCommand request, CancellationToken cancellationToken)
        {
            if (request.ClientId == request.AssistantId)
                throw new AppException("You cannot start a session with yourself.");

            var service = await _dbContext.Services
                .FirstOrDefaultAsync(s => s.Id == request.ServiceId, cancellationToken);

            if (service == null || !service.IsActive)
                throw new AppException("Service not found", 404);

            var amount = service.Price;
            var paymentSuccess = true; // Simulate payment

            if (!paymentSuccess)
                throw new AppException("Payment failed");

            var command = new CreateSessionCommand(request.ClientId, request.AssistantId, request.ServiceId, amount, PaymentStatus.Paid);
            var result = await _mediator.Send(command, cancellationToken);

            return new StartSessionResponse(result.SessionId);
        }
    }
}
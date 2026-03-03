using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.Commands.AcceptSession
{
    public class AcceptSessionHandler : IRequestHandler<AcceptSessionCommand, AcceptSessionResponse>
    {
        private readonly IAppDbContext _dbContext;

        public AcceptSessionHandler(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
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

            session.Status = SessionStatus.Active;
            session.AcceptedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return new AcceptSessionResponse(SessionId: session.Id, session.Status.ToString());
        }
    }
}
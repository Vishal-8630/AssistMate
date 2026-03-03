using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.Commands.RejectSession
{
    public class RejectSessionHandler : IRequestHandler<RejectSessionCommand, RejectSessionResponse>
    {
        private readonly IAppDbContext _dbContext;

        public RejectSessionHandler(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<RejectSessionResponse> Handle(RejectSessionCommand request, CancellationToken cancellationToken)
        {
            var session = await _dbContext.Sessions
                .FirstOrDefaultAsync(x => x.Id == request.SessionId, cancellationToken);

            if (session == null)
                throw new AppException("Session not found", 404);

            if (session.AssistantId != request.AssistantId)
                throw new AppException("Unauthorized to reject this session.");

            if (session.Status != SessionStatus.Requested)
                throw new AppException("Session cannot be rejected.");

            session.Status = SessionStatus.Rejected;
            session.CancelledAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return new RejectSessionResponse(SessionId: session.Id, Status: session.Status.ToString());
        }
    }
}
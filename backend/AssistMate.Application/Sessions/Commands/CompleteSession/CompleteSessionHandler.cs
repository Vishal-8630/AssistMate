using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.Commands.CompleteSession
{
    public class CompleteSessionHandler : IRequestHandler<CompleteSessionCommand>
    {
        private readonly IAppDbContext _dbContext;
        private readonly ICurrentUserService _currentUser;

        public CompleteSessionHandler(IAppDbContext dbContext, ICurrentUserService currentUser)
        {
            _dbContext = dbContext;
            _currentUser = currentUser;
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

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
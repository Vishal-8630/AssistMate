using AssistMate.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.GetSessionDetails
{
    public class GetSessionDetailsHandler : IRequestHandler<GetSessionDetailsQuery, GetSessionDetailsResponse?>
    {
        private readonly IAppDbContext _dbContext;

        public GetSessionDetailsHandler(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<GetSessionDetailsResponse?> Handle(GetSessionDetailsQuery request, CancellationToken cancellationToken)
        {
            var session = await _dbContext.Sessions
                .AsNoTracking()
                .Include(x => x.Client)
                .Include(x => x.Assistant)
                .FirstOrDefaultAsync(s => s.Id == request.SessionId, cancellationToken);

            if (session == null)
                return null;

            return new GetSessionDetailsResponse(
                session.Id,
                session.ClientId,
                $"{session.Client.FirstName} {session.Client.LastName}",
                session.AssistantId,
                $"{session.Assistant.FirstName} {session.Assistant.LastName}",
                session.Status.ToString()
            );
        }
    }
}
using AssistMate.Application.Common.Interfaces;
using AssistMate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.GetMySessions
{
    public class GetMySessionsHandler : IRequestHandler<GetMySessionQuery, List<SessionDto>>
    {
        public readonly IAppDbContext _dbContext;

        public GetMySessionsHandler(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<SessionDto>> Handle(GetMySessionQuery request, CancellationToken cancellationToken)
        {
            var query = _dbContext.Sessions
                .Include(x => x.Service)
                .AsQueryable();

            if (request.Role == UserRole.Client)
            {
                query = query.Where(x => x.ClientId == request.UserId);
            } 
            else if (request.Role == UserRole.Assistant)
            {
                query = query.Where(x => x.AssistantId == request.UserId);
            }
            else
            {
                return new List<SessionDto>();
            }

            var sessions = await query
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new SessionDto(
                    x.Id,
                    x.AssistantId,
                    x.ClientId,
                    x.Service.Name,
                    x.Status.ToString(),
                    x.CreatedAt
                ))
                .ToListAsync(cancellationToken);

            return sessions;
        }
    }
}
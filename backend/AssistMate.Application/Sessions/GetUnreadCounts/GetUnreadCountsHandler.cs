using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Sessions.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.GetUnreadCounts
{
    public class GetUnreadCountsHandler : IRequestHandler<GetUnreadCountsQuery, List<UnreadCountDto>>
    {
        private readonly IAppDbContext _dbContext;

        public GetUnreadCountsHandler(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<UnreadCountDto>> Handle(GetUnreadCountsQuery request, CancellationToken cancellationToken)
        {
            var userId = request.UserId;

            return await _dbContext.SessionMessages
                .Where(m => m.SenderId != userId && m.ReadAt == null && (
                    m.Session.ClientId == userId || m.Session.AssistantId == userId
                ))
                .GroupBy(m => m.SessionId)
                .Select(g => new UnreadCountDto(g.Key, g.Count()))
                .ToListAsync(cancellationToken);
        }
    }
}
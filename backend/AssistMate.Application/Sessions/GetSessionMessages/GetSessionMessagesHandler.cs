using AssistMate.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.GetSessionMessages
{
    public class GetSessionMessagesHandler : IRequestHandler<GetSessionMessagesQuery, List<SessionMessageDto>>
    {
        private readonly IAppDbContext _dbContext;

        public GetSessionMessagesHandler(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<SessionMessageDto>> Handle(GetSessionMessagesQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.SessionMessages
                .Where(m => m.SessionId == request.SessionId)
                .OrderBy(m => m.CreatedAt)
                .Select(m => new SessionMessageDto(
                    m.Id,
                    m.SessionId,
                    m.SenderId,
                    m.Content,
                    m.CreatedAt
                 ))
                .ToListAsync(cancellationToken);
        }
    }
}
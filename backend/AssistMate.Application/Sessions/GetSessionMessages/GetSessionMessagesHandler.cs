using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Sessions.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.GetSessionMessages
{
    public class GetSessionMessagesHandler : IRequestHandler<GetSessionMessagesQuery, List<SessionMessageDto>>
    {
        private readonly IAppDbContext _dbContext;
        private readonly ICurrentUserService _currentUser;

        public GetSessionMessagesHandler(IAppDbContext dbContext, ICurrentUserService currentUser)
        {
            _dbContext = dbContext;
            _currentUser = currentUser;
        }

        public async Task<List<SessionMessageDto>> Handle(GetSessionMessagesQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUser.UserId;
            var isParticipant = await _dbContext.Sessions
                .AsNoTracking()
                .AnyAsync(s => s.Id == request.SessionId && (s.ClientId == userId || s.AssistantId == userId), cancellationToken);

            if (!isParticipant)
                throw new AppException("Unauthorized access");

            return await _dbContext.SessionMessages
                .Include(m => m.Reactions)
                .Include(m => m.ParentMessage)
                .Where(m => m.SessionId == request.SessionId)
                .OrderBy(m => m.CreatedAt)
                .Select(m => new SessionMessageDto(
                    m.Id,
                    m.SessionId,
                    m.SenderId,
                    m.Content,
                    m.CreatedAt,
                    m.ParentMessageId,
                    m.ParentMessage != null ? new ParentMessageDto(m.ParentMessage.Id, m.ParentMessage.Content, m.ParentMessage.SenderId) : null,
                    m.Reactions.Select(r => new MessageReactionDto(r.UserId, r.Emoji)).ToList()
                 ))
                .ToListAsync(cancellationToken);
        }
    }
}
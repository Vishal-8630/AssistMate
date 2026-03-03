using AssistMate.Application.Common.Interfaces;
using AssistMate.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Infrastructure.Services
{
    public class SessionAuthorizationService : ISessionAuthorizationService
    {
        private readonly IAppDbContext _dbContext;

        public SessionAuthorizationService(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> IsUserParticipantAsync(Guid sessionId, Guid userId)
        {
            return await _dbContext.Sessions
                .AsNoTracking()
                .AnyAsync(s => s.Id == sessionId && (s.ClientId == userId || s.AssistantId == userId)
            );
        }

        public async Task<bool> IsSessionActiveAsync(Guid sessionId)
        {
            return await _dbContext.Sessions
                .AsNoTracking()
                .AnyAsync(s => s.Id == sessionId && s.Status == SessionStatus.Active);
        }
    }
}
namespace AssistMate.Application.Common.Interfaces
{
    public interface ISessionAuthorizationService
    {
        Task<bool> IsUserParticipantAsync(Guid sessionId, Guid userId);
        Task<bool> IsSessionActiveAsync(Guid sessionId);
    }
}
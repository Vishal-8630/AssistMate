namespace AssistMate.Application.Sessions.Commands.CreateSession
{
    public record CreateSessionRequest(Guid AssistantId, Guid ServiceId);
}
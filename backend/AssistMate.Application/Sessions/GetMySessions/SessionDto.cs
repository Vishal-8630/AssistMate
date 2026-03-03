namespace AssistMate.Application.Sessions.GetMySessions
{
    public record SessionDto(
        Guid SessionId,
        Guid AssistantId,
        Guid ClientId,
        string ServiceName,
        string Status,
        DateTime CreatedAt
    );
}
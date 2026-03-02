namespace AssistMate.Application.Sessions.GetSessionMessages
{
    public record SessionMessageDto(Guid Id, Guid SessionId, Guid SenderId, string Content, DateTime CreatedAt);
}
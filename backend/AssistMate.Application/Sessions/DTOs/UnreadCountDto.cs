namespace AssistMate.Application.Sessions.DTOs
{
    public record UnreadCountDto(Guid SessionId, int UnreadCount);
}
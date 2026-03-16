namespace AssistMate.Application.Sessions.DTOs
{
    public record ParentMessageDto(
        Guid Id,
        string Content,
        Guid SenderId
    );
}
using AssistMate.Application.Sessions.GetSessionMessages;

namespace AssistMate.Application.Sessions.DTOs
{
    public record SessionMessageDto(
        Guid Id,
        Guid SessionId,
        Guid SenderId,
        string Content,
        DateTime CreatedAt,
        Guid? ParentMessageId,
        ParentMessageDto? ParentMessage,
        IReadOnlyList<MessageReactionDto>? Reactions
    );
}
namespace AssistMate.Application.Sessions.GetSessionMessages
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

    public record ParentMessageDto(
        Guid Id,
        string Content,
        Guid SenderId
    );

    public record MessageReactionDto(
        Guid UserId,
        string Emoji
    );
}
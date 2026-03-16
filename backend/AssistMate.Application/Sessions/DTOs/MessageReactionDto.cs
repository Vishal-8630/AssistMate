namespace AssistMate.Application.Sessions.DTOs
{
    public record MessageReactionDto(
        Guid UserId,
        string Emoji
    );
}
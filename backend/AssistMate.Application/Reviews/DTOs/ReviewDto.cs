namespace AssistMate.Application.Reviews.DTOs
{
    public record ReviewDto(
        Guid Id,
        Guid SessionId,
        Guid ReviewerId,
        Guid RevieweeId,
        int Rating,
        string? Comment,
        DateTime CreatedAt
    );
}
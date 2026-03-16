namespace AssistMate.Application.Reviews.DTOs.Requests
{
    public record CreateReviewRequest(Guid SessionId, int Rating, string? Comment);
}
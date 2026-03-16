namespace AssistMate.Application.Reviews.DTOs
{
    public record AssistantReviewDto(
        double AverageRating,
        int TotalReviews,
        List<ReviewDto> Reviews
    );
}
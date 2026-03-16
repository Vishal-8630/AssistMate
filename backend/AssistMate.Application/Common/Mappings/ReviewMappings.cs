using AssistMate.Application.Reviews.DTOs;
using AssistMate.Domain.Entities;

namespace AssistMate.Application.Common.Mappings
{
    public static class ReviewMappings
    {
        public static ReviewDto ToReviewDto(this Review review)
        {
            return new ReviewDto(
                review.Id,
                review.SessionId,
                review.ReviewerId,
                review.RevieweeId,
                review.Rating,
                review.Comment,
                review.CreatedAt
            );
        }
    }
}
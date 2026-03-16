using AssistMate.Application.Reviews.DTOs;
using AssistMate.Application.Reviews.DTOs.Requests;

namespace AssistMate.Application.Reviews.Interfaces
{
    public interface IReviewService
    {
        Task<ReviewDto> CreateReviewAsync(Guid userId, CreateReviewRequest request);
        Task<ReviewDto?> GetReviewForSessionAsync(Guid userId, Guid sessionId);
    }
}
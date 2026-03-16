using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Common.Mappings;
using AssistMate.Application.Reviews.DTOs;
using AssistMate.Application.Reviews.DTOs.Requests;
using AssistMate.Application.Reviews.Interfaces;
using AssistMate.Domain.Entities;
using AssistMate.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Reviews.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IAppDbContext _dbContext;

        public ReviewService(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ReviewDto> CreateReviewAsync(Guid userId, CreateReviewRequest request)
        {
            var session = await _dbContext.Sessions
                .FirstOrDefaultAsync(s => s.Id == request.SessionId);

            if (session == null)
                throw new AppException("Session not found");

            if (session.Status != SessionStatus.Completed)
                throw new AppException("Session must be completed before reviewing.");

            var isParticipant = session.ClientId == userId || session.AssistantId == userId;
            if (!isParticipant)
                throw new AppException("Your are not the part of the session");

            var alreadyReviewed = await _dbContext.Reviews
                .AnyAsync(r => r.SessionId == request.SessionId && r.ReviewerId == userId);

            if (alreadyReviewed)
                throw new AppException("You have already reviewed the session");

            var revieweeId = session.ClientId == userId
                ? session.AssistantId
                : session.ClientId;

            var review = new Review
            {
                Id = Guid.NewGuid(),
                SessionId = request.SessionId,
                ReviewerId = userId,
                RevieweeId = revieweeId,
                Rating = request.Rating,
                Comment = request.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.Reviews.Add(review);
            await _dbContext.SaveChangesAsync();

            return review.ToReviewDto();
        }

        public async Task<ReviewDto?> GetReviewForSessionAsync(Guid userId, Guid sessionId)
        {
            var review = await _dbContext.Reviews
                .Include(r => r.Reviewer)
                .FirstOrDefaultAsync(r => r.SessionId == sessionId && r.ReviewerId == userId);

            return review?.ToReviewDto();
        }

        public async Task<AssistantReviewDto> GetAssistantReviewAsync(Guid assistantId)
        {
            var reviews = await _dbContext.Reviews
                .Where(r => r.RevieweeId == assistantId)
                .OrderByDescending(r => r.CreatedAt)
                .Include(r => r.Reviewer)
                .ToListAsync();

            var total = reviews.Count;
            var avg = total == 0
                ? 0
                : reviews.Average(r => r.Rating);

            return new AssistantReviewDto(avg, total, [.. reviews.Select(r => r.ToReviewDto())]);
        }
    }
}
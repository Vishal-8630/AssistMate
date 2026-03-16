using AssistMate.Application.Common.Security;
using AssistMate.Application.Reviews.DTOs;
using AssistMate.Application.Reviews.DTOs.Requests;
using AssistMate.Application.Reviews.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssistMate.Api.Controllers
{
    [ApiController]
    [Route("api/reviews")]
    [Authorize]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost]
        public async Task<ActionResult<ReviewDto>> CreateReview(CreateReviewRequest request)
        {
            var userId = User.GetUserId();
            var review = await _reviewService.CreateReviewAsync(userId, request);

            return Ok(review);
        }

        [HttpGet("session/{sessionId}")]
        public async Task<ActionResult<ReviewDto?>> GetReviewForSession(Guid sessionId)
        {
            var userId = User.GetUserId();
            var review = await _reviewService.GetReviewForSessionAsync(userId, sessionId);

            return Ok(review);
        }

        [HttpGet("assistant/{assistantId}")]
        public async Task<IActionResult> GetAssistantReviews(Guid assistantId)
        {
            var result = await _reviewService.GetAssistantReviewAsync(assistantId);
            return Ok(result);
        }
    }
}
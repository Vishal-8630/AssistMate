using AssistMate.Application.Reviews.DTOs.Requests;
using FluentValidation;

namespace AssistMate.Application.Reviews.Validators
{
    public class CreateReviewRequestValidator : AbstractValidator<CreateReviewRequest>
    {
        public CreateReviewRequestValidator()
        {
            RuleFor(x => x.SessionId)
                .NotEmpty();

            RuleFor(x => x.Rating)
                .InclusiveBetween(1, 5);

            RuleFor(x => x.Comment)
                .MaximumLength(1000);
        }
    }
}
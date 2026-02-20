using AssistMate.Application.Auth.DTOs;
using FluentValidation;

namespace AssistMate.Application.Auth.Validators
{
    public class SendOtpRequestValidator : AbstractValidator<SendOtpRequest>
    {
        public SendOtpRequestValidator()
        {
            RuleFor(x => x.PhoneNumber)
                .Cascade(CascadeMode.Stop)
                .NotEmpty()
                    .WithMessage("Phone number is required")
                .Matches(@"^[0-9]{10}$")
                    .WithMessage("Phone number must be exactly 10 digits.");
        }
    }
}
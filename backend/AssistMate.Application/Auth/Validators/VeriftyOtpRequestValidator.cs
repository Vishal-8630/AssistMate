using AssistMate.Application.Auth.DTOs.Requests;
using FluentValidation;

namespace AssistMate.Application.Auth.Validators
{
    public class VerifyOtpRequestValidator : AbstractValidator<VerifyOtpRequest>
    {
        public VerifyOtpRequestValidator()
        {
            RuleFor(x => x.PhoneNumber)
                .Cascade(CascadeMode.Stop)
                .NotEmpty()
                    .WithMessage("Phone number is required")
                .Matches(@"^[0-9]{10}$")
                    .WithMessage("Phone number must be exactly 10 digits.");

            RuleFor(x => x.Otp)
                .Cascade(CascadeMode.Stop)
                .NotEmpty()
                    .WithMessage("OTP is required")
                .Length(6)
                    .WithMessage("OTP must be 6 digits.")
                .Matches(@"^[0-9]{6}$")
                    .WithMessage("OTP must contain only digits");
        }
    }
}
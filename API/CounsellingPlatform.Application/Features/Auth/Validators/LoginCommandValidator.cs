using FluentValidation;
using CounsellingPlatform.Application.Features.Auth.Commands;

namespace CounsellingPlatform.Application.Features.Auth.Validators;

/// <summary>
/// Validates LoginCommand via MediatR pipeline.
/// </summary>
public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("A valid email address is required.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.");
    }
}

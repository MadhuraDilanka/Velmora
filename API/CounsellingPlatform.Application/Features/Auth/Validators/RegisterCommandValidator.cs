using FluentValidation;
using CounsellingPlatform.Application.Features.Auth.Commands;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Application.Features.Auth.Validators;

/// <summary>
/// Validates RegisterCommand via MediatR pipeline.
/// Delegates field-level rules to RegisterRequestValidator and
/// enforces that Admin accounts cannot be self-registered.
/// </summary>
public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Request)
            .NotNull().WithMessage("Request payload is required.")
            .SetValidator(new RegisterRequestValidator());

        RuleFor(x => x.Request.Role)
            .Must(role => role == UserRole.Client || role == UserRole.Counsellor)
            .WithMessage("Only Client and Counsellor roles can self-register.");
    }
}

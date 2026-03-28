using MediatR;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Application.DTOs.Auth;

namespace CounsellingPlatform.Application.Features.Auth.Commands;

public record RegisterCommand(RegisterRequestDto Request) : IRequest<AuthResponseDto>;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponseDto>
{
    private readonly IAuthService _authService;

    public RegisterCommandHandler(IAuthService authService)
    {
        _authService = authService;
    }

    public async Task<AuthResponseDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        return await _authService.RegisterAsync(request.Request, cancellationToken);
    }
}

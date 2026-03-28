using MediatR;
using CounsellingPlatform.Application.Common.Interfaces;

namespace CounsellingPlatform.Application.Features.Auth.Commands;

public record RevokeTokenCommand(Guid UserId) : IRequest;

public class RevokeTokenCommandHandler : IRequestHandler<RevokeTokenCommand>
{
    private readonly IAuthService _authService;

    public RevokeTokenCommandHandler(IAuthService authService)
    {
        _authService = authService;
    }

    public async Task Handle(RevokeTokenCommand request, CancellationToken cancellationToken)
    {
        await _authService.RevokeTokenAsync(request.UserId, cancellationToken);
    }
}

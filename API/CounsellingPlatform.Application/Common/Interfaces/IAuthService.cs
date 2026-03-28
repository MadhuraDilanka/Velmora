using CounsellingPlatform.Application.DTOs.Auth;

namespace CounsellingPlatform.Application.Common.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(string email, string password, CancellationToken cancellationToken = default);
    Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request, CancellationToken cancellationToken = default);
    Task<AuthResponseDto> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);
    Task RevokeTokenAsync(Guid userId, CancellationToken cancellationToken = default);
}

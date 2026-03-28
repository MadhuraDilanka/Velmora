using CounsellingPlatform.Domain.Entities;

namespace CounsellingPlatform.Application.Common.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    Guid? GetUserIdFromToken(string token);
}

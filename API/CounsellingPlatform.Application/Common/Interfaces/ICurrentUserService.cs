namespace CounsellingPlatform.Application.Common.Interfaces;

/// <summary>
/// Provides the identity of the currently authenticated user,
/// used by AppDbContext to auto-populate CreatedBy / UpdatedBy audit fields.
/// </summary>
public interface ICurrentUserService
{
    string? UserId { get; }
    string? UserEmail { get; }
    bool IsAuthenticated { get; }
}

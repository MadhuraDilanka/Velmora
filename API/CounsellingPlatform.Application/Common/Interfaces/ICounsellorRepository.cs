using CounsellingPlatform.Domain.Entities;

namespace CounsellingPlatform.Application.Common.Interfaces;

public interface ICounsellorRepository
{
    Task<CounsellorProfile?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<CounsellorProfile?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<CounsellorProfile>> GetAllApprovedAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<CounsellorProfile>> GetPendingApprovalAsync(CancellationToken cancellationToken = default);
    Task AddAsync(CounsellorProfile profile, CancellationToken cancellationToken = default);
    Task UpdateAsync(CounsellorProfile profile, CancellationToken cancellationToken = default);
}

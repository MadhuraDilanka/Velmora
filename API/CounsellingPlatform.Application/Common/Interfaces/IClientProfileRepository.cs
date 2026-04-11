using CounsellingPlatform.Domain.Entities;

namespace CounsellingPlatform.Application.Common.Interfaces;

public interface IClientProfileRepository
{
    Task<ClientProfile?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task AddAsync(ClientProfile profile, CancellationToken cancellationToken = default);
    Task UpdateAsync(ClientProfile profile, CancellationToken cancellationToken = default);
}

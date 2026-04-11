using Microsoft.EntityFrameworkCore;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Domain.Entities;
using CounsellingPlatform.Infrastructure.Persistence;

namespace CounsellingPlatform.Infrastructure.Repositories;

public class ClientProfileRepository : IClientProfileRepository
{
    private readonly AppDbContext _context;

    public ClientProfileRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ClientProfile?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        => await _context.ClientProfiles
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.UserId == userId, cancellationToken);

    public async Task AddAsync(ClientProfile profile, CancellationToken cancellationToken = default)
        => await _context.ClientProfiles.AddAsync(profile, cancellationToken);

    public Task UpdateAsync(ClientProfile profile, CancellationToken cancellationToken = default)
    {
        _context.ClientProfiles.Update(profile);
        return Task.CompletedTask;
    }
}

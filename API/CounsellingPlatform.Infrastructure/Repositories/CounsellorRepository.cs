using Microsoft.EntityFrameworkCore;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Domain.Entities;
using CounsellingPlatform.Domain.Enums;
using CounsellingPlatform.Infrastructure.Persistence;

namespace CounsellingPlatform.Infrastructure.Repositories;

public class CounsellorRepository : ICounsellorRepository
{
    private readonly AppDbContext _context;

    public CounsellorRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<CounsellorProfile?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await _context.CounsellorProfiles
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

    public async Task<CounsellorProfile?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        => await _context.CounsellorProfiles
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.UserId == userId, cancellationToken);

    public async Task<IEnumerable<CounsellorProfile>> GetAllApprovedAsync(CancellationToken cancellationToken = default)
        => await _context.CounsellorProfiles
            .Include(c => c.User)
            .Where(c => c.ApprovalStatus == ApprovalStatus.Approved && c.IsAvailable)
            .ToListAsync(cancellationToken);

    public async Task<IEnumerable<CounsellorProfile>> GetPendingApprovalAsync(CancellationToken cancellationToken = default)
        => await _context.CounsellorProfiles
            .Include(c => c.User)
            .Where(c => c.ApprovalStatus == ApprovalStatus.Pending)
            .ToListAsync(cancellationToken);

    public async Task AddAsync(CounsellorProfile profile, CancellationToken cancellationToken = default)
        => await _context.CounsellorProfiles.AddAsync(profile, cancellationToken);

    public Task UpdateAsync(CounsellorProfile profile, CancellationToken cancellationToken = default)
    {
        _context.CounsellorProfiles.Update(profile);
        return Task.CompletedTask;
    }
}

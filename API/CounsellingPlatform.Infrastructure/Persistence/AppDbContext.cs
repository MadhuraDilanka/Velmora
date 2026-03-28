using Microsoft.EntityFrameworkCore;
using CounsellingPlatform.Domain.Entities;
using CounsellingPlatform.Domain.Common;
using CounsellingPlatform.Application.Common.Interfaces;

namespace CounsellingPlatform.Infrastructure.Persistence;

public class AppDbContext : DbContext, IUnitOfWork
{
    private readonly ICurrentUserService _currentUser;

    public AppDbContext(DbContextOptions<AppDbContext> options, ICurrentUserService currentUser)
        : base(options)
    {
        _currentUser = currentUser;
    }

    // ── DbSets ────────────────────────────────────────────────────────────────
    public DbSet<User> Users => Set<User>();
    public DbSet<ClientProfile> ClientProfiles => Set<ClientProfile>();
    public DbSet<CounsellorProfile> CounsellorProfiles => Set<CounsellorProfile>();

    // ── Model configuration ───────────────────────────────────────────────────
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Scans this assembly for all IEntityTypeConfiguration<T> classes
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }

    // ── Audit trail ───────────────────────────────────────────────────────────
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var actor = _currentUser.UserEmail ?? _currentUser.UserId ?? "system";

        foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.CreatedBy = actor;
                    break;

                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedBy = actor;
                    // Prevent accidental overwrite of creation metadata
                    entry.Property(e => e.CreatedAt).IsModified = false;
                    entry.Property(e => e.CreatedBy).IsModified = false;
                    break;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CounsellingPlatform.Domain.Entities;

namespace CounsellingPlatform.Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(u => u.Id);

        // ── Identity ─────────────────────────────────────────────────────────
        builder.Property(u => u.FirstName)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(u => u.LastName)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(256);

        builder.HasIndex(u => u.Email)
            .IsUnique()
            .HasDatabaseName("IX_Users_Email");

        builder.Property(u => u.PasswordHash)
            .IsRequired();

        builder.Property(u => u.PhoneNumber)
            .HasMaxLength(20);

        builder.Property(u => u.ProfilePictureUrl)
            .HasMaxLength(500);

        // ── Enums stored as int ───────────────────────────────────────────────
        builder.Property(u => u.Role)
            .IsRequired()
            .HasConversion<int>();

        // ── Soft-delete global filter ─────────────────────────────────────────
        builder.HasQueryFilter(u => !u.IsDeleted);

        // ── Audit columns ─────────────────────────────────────────────────────
        builder.Property(u => u.CreatedBy).HasMaxLength(256);
        builder.Property(u => u.UpdatedBy).HasMaxLength(256);

        // ── Relationships ─────────────────────────────────────────────────────
        builder.HasOne(u => u.ClientProfile)
            .WithOne(cp => cp.User)
            .HasForeignKey<ClientProfile>(cp => cp.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(u => u.CounsellorProfile)
            .WithOne(cp => cp.User)
            .HasForeignKey<CounsellorProfile>(cp => cp.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

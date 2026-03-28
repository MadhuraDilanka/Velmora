using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CounsellingPlatform.Domain.Entities;

namespace CounsellingPlatform.Infrastructure.Persistence.Configurations;

public class CounsellorProfileConfiguration : IEntityTypeConfiguration<CounsellorProfile>
{
    public void Configure(EntityTypeBuilder<CounsellorProfile> builder)
    {
        builder.ToTable("CounsellorProfiles");
        builder.HasKey(c => c.Id);

        // ── Professional identity ─────────────────────────────────────────────
        builder.Property(c => c.ProfessionalTitle)
            .HasMaxLength(200);

        builder.Property(c => c.Bio)
            .HasMaxLength(2000);

        builder.Property(c => c.Specializations)
            .HasMaxLength(500);

        builder.Property(c => c.Qualifications)
            .HasMaxLength(1000);

        builder.Property(c => c.Languages)
            .HasMaxLength(200);

        // ── Consultation ──────────────────────────────────────────────────────
        builder.Property(c => c.SessionFee)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(c => c.SessionDurationMinutes)
            .HasDefaultValue(60);

        // ── Media & documents ─────────────────────────────────────────────────
        builder.Property(c => c.ProfileImageUrl)
            .HasMaxLength(500);

        builder.Property(c => c.CertificateUrl)
            .HasMaxLength(500);

        builder.Property(c => c.LinkedInUrl)
            .HasMaxLength(300);

        // ── Admin approval ────────────────────────────────────────────────────
        builder.Property(c => c.ApprovalStatus)
            .HasConversion<int>()
            .IsRequired();

        builder.Property(c => c.RejectionReason)
            .HasMaxLength(500);

        // ── Ratings ───────────────────────────────────────────────────────────
        builder.Property(c => c.AverageRating)
            .HasPrecision(3, 2)
            .HasDefaultValue(0.0);

        // ── Index for fast approved counsellor lookups ────────────────────────
        builder.HasIndex(c => c.ApprovalStatus)
            .HasDatabaseName("IX_CounsellorProfiles_ApprovalStatus");

        builder.HasIndex(c => c.IsAvailable)
            .HasDatabaseName("IX_CounsellorProfiles_IsAvailable");

        // ── Audit columns ─────────────────────────────────────────────────────
        builder.Property(c => c.CreatedBy).HasMaxLength(256);
        builder.Property(c => c.UpdatedBy).HasMaxLength(256);

        // ── Soft-delete global filter (excludes deleted counsellors AND users) ─
        builder.HasQueryFilter(c => !c.IsDeleted && !c.User.IsDeleted);
    }
}

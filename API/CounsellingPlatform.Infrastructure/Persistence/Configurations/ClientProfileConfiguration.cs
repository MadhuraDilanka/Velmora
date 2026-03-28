using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CounsellingPlatform.Domain.Entities;

namespace CounsellingPlatform.Infrastructure.Persistence.Configurations;

public class ClientProfileConfiguration : IEntityTypeConfiguration<ClientProfile>
{
    public void Configure(EntityTypeBuilder<ClientProfile> builder)
    {
        builder.ToTable("ClientProfiles");
        builder.HasKey(c => c.Id);

        // ── Personal details ──────────────────────────────────────────────────
        builder.Property(c => c.Gender).HasMaxLength(20);
        builder.Property(c => c.Nationality).HasMaxLength(100);
        builder.Property(c => c.Occupation).HasMaxLength(100);

        // ── Address ───────────────────────────────────────────────────────────
        builder.Property(c => c.AddressLine1).HasMaxLength(200);
        builder.Property(c => c.AddressLine2).HasMaxLength(200);
        builder.Property(c => c.City).HasMaxLength(100);
        builder.Property(c => c.State).HasMaxLength(100);
        builder.Property(c => c.Country).HasMaxLength(100);
        builder.Property(c => c.PostalCode).HasMaxLength(20);

        // ── Emergency contact ─────────────────────────────────────────────────
        builder.Property(c => c.EmergencyContactName).HasMaxLength(100);
        builder.Property(c => c.EmergencyContactPhone).HasMaxLength(20);
        builder.Property(c => c.EmergencyContactRelationship).HasMaxLength(50);

        // ── Preferences / media ───────────────────────────────────────────────
        builder.Property(c => c.PreferredLanguage).HasMaxLength(50);
        builder.Property(c => c.ProfileImageUrl).HasMaxLength(500);
        builder.Property(c => c.Notes).HasMaxLength(2000);

        // ── Audit columns ─────────────────────────────────────────────────────
        builder.Property(c => c.CreatedBy).HasMaxLength(256);
        builder.Property(c => c.UpdatedBy).HasMaxLength(256);

        // ── Soft-delete global filter ─────────────────────────────────────────
        builder.HasQueryFilter(c => !c.IsDeleted);
    }
}

using CounsellingPlatform.Domain.Common;

namespace CounsellingPlatform.Domain.Entities;

public class ClientProfile : AuditableEntity
{
    public Guid UserId { get; set; }

    // Personal details
    public DateTime? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public string? Nationality { get; set; }
    public string? Occupation { get; set; }

    // Address
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Country { get; set; }
    public string? PostalCode { get; set; }

    // Emergency contact
    public string? EmergencyContactName { get; set; }
    public string? EmergencyContactPhone { get; set; }
    public string? EmergencyContactRelationship { get; set; }

    // Preferences / media
    public string? PreferredLanguage { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public User User { get; set; } = null!;
}

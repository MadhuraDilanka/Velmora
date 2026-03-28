using CounsellingPlatform.Domain.Common;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Domain.Entities;

public class CounsellorProfile : AuditableEntity
{
    public Guid UserId { get; set; }

    // Professional identity
    public string? ProfessionalTitle { get; set; }     // e.g. "Licensed Clinical Psychologist"
    public string? Bio { get; set; }
    public string? Specializations { get; set; }       // e.g. "Anxiety, Depression"
    public string? Qualifications { get; set; }        // e.g. "MSc Clinical Psychology"
    public string? Languages { get; set; }             // e.g. "English, Sinhala"
    public int YearsOfExperience { get; set; }

    // Consultation
    public decimal SessionFee { get; set; }            // Per session fee
    public int SessionDurationMinutes { get; set; } = 60;
    public bool IsAvailableOnline { get; set; } = true;
    public bool IsAvailableInPerson { get; set; } = false;

    // Media & documents
    public string? ProfileImageUrl { get; set; }
    public string? CertificateUrl { get; set; }        // Uploaded credential document
    public string? LinkedInUrl { get; set; }

    // Admin approval
    public ApprovalStatus ApprovalStatus { get; set; } = ApprovalStatus.Pending;
    public bool IsVerified { get; set; } = false;
    public string? RejectionReason { get; set; }
    public DateTime? ApprovedAt { get; set; }

    // Ratings (aggregated)
    public double AverageRating { get; set; } = 0;
    public int TotalReviews { get; set; } = 0;
    public bool IsAvailable { get; set; } = true;

    // Navigation
    public User User { get; set; } = null!;
}

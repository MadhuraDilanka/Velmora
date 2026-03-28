using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Application.DTOs.Counsellor;

public class CounsellorProfileDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? Specializations { get; set; }
    public string? Qualifications { get; set; }
    public string? Languages { get; set; }
    public int YearsOfExperience { get; set; }
    public string? ProfessionalTitle { get; set; }
    public decimal SessionFee { get; set; }
    public bool IsVerified { get; set; }
    public int SessionDurationMinutes { get; set; }
    public string? ProfileImageUrl { get; set; }
    public bool IsAvailableOnline { get; set; }
    public bool IsAvailableInPerson { get; set; }
    public ApprovalStatus ApprovalStatus { get; set; }
    public double AverageRating { get; set; }
    public int TotalReviews { get; set; }
    public bool IsAvailable { get; set; }
}

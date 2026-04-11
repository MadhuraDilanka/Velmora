namespace CounsellingPlatform.Application.DTOs.Counsellor;

public class UpdateCounsellorProfileDto
{
    public string? ProfessionalTitle { get; set; }
    public string? Bio { get; set; }
    public string? Specializations { get; set; }
    public string? Qualifications { get; set; }
    public string? Languages { get; set; }
    public int YearsOfExperience { get; set; }
    public decimal SessionFee { get; set; }
    public int SessionDurationMinutes { get; set; } = 60;
    public bool IsAvailableOnline { get; set; } = true;
    public bool IsAvailableInPerson { get; set; }
    public bool IsAvailable { get; set; } = true;
    public string? LinkedInUrl { get; set; }
}

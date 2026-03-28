using CounsellingPlatform.Domain.Common;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Domain.Entities;

public class User : AuditableEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public UserRole Role { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsEmailVerified { get; set; } = false;
    public DateTime? LastLoginAt { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }

    public string FullName => $"{FirstName} {LastName}";

    // Navigation properties
    public ClientProfile? ClientProfile { get; set; }
    public CounsellorProfile? CounsellorProfile { get; set; }
}

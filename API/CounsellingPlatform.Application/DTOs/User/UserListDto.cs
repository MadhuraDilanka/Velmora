using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Application.DTOs.User;

public class UserListDto
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public string? PhoneNumber { get; set; }
}

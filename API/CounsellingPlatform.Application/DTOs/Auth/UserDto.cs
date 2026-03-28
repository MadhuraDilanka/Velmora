using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Application.DTOs.Auth;

public class UserDto
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public UserRole Role { get; set; }
}

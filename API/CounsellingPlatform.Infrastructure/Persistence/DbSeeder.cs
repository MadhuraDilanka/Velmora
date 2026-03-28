using CounsellingPlatform.Domain.Entities;
using CounsellingPlatform.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace CounsellingPlatform.Infrastructure.Persistence;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.Users.AnyAsync())
            return; // Already seeded

        var users = new List<User>
        {
            new User
            {
                FirstName = "Admin",
                LastName = "User",
                Email = "admin@counselling.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@1234"),
                Role = UserRole.Admin,
                IsActive = true,
                IsEmailVerified = true
            },
            new User
            {
                FirstName = "John",
                LastName = "Client",
                Email = "client@counselling.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Client@1234"),
                Role = UserRole.Client,
                IsActive = true,
                IsEmailVerified = true
            },
            new User
            {
                FirstName = "Sarah",
                LastName = "Counsellor",
                Email = "counsellor@counselling.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Counsellor@1234"),
                Role = UserRole.Counsellor,
                IsActive = true,
                IsEmailVerified = true
            }
        };

        await context.Users.AddRangeAsync(users);
        await context.SaveChangesAsync();

        // Add counsellor profile for the counsellor user
        var counsellorUser = users.First(u => u.Role == UserRole.Counsellor);
        var counsellorProfile = new CounsellorProfile
        {
            UserId = counsellorUser.Id,
            ProfessionalTitle = "Licensed Clinical Psychologist",
            Bio = "Experienced counsellor specializing in anxiety and depression.",
            Specializations = "Anxiety, Depression, Stress Management",
            Qualifications = "MSc Clinical Psychology",
            Languages = "English",
            YearsOfExperience = 5,
            SessionFee = 50.00m,
            SessionDurationMinutes = 60,
            IsAvailableOnline = true,
            ApprovalStatus = ApprovalStatus.Approved,
            IsVerified = true,
            ApprovedAt = DateTime.UtcNow,
            IsAvailable = true
        };

        await context.CounsellorProfiles.AddAsync(counsellorProfile);
        await context.SaveChangesAsync();
    }
}

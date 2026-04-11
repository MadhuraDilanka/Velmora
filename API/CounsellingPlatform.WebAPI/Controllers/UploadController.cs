using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UploadController : ControllerBase
{
    private static readonly string[] AllowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB

    private readonly IUserRepository _userRepository;
    private readonly ICounsellorRepository _counsellorRepository;
    private readonly IClientProfileRepository _clientProfileRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IWebHostEnvironment _env;

    public UploadController(
        IUserRepository userRepository,
        ICounsellorRepository counsellorRepository,
        IClientProfileRepository clientProfileRepository,
        IUnitOfWork unitOfWork,
        IWebHostEnvironment env)
    {
        _userRepository          = userRepository;
        _counsellorRepository    = counsellorRepository;
        _clientProfileRepository = clientProfileRepository;
        _unitOfWork              = unitOfWork;
        _env                     = env;
    }

    /// <summary>Upload or replace the calling user's profile picture.</summary>
    [HttpPost("avatar")]
    [Consumes("multipart/form-data")]
    [ProducesResponseType(typeof(UploadAvatarResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UploadAvatar(
        IFormFile file,
        CancellationToken cancellationToken)
    {
        // ── Validate ────────────────────────────────────────────────────────
        if (file is null || file.Length == 0)
            return BadRequest(new { message = "No file was uploaded." });

        if (file.Length > MaxFileSizeBytes)
            return BadRequest(new { message = "File must not exceed 5 MB." });

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(ext))
            return BadRequest(new { message = "Only JPG, PNG, and WebP images are allowed." });

        // ── Resolve current user ─────────────────────────────────────────────
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        if (!Guid.TryParse(claim, out var userId))
            return Unauthorized();

        var user = await _userRepository.GetByIdAsync(userId, cancellationToken);
        if (user is null)
            return NotFound(new { message = "User not found." });

        // ── Save file ────────────────────────────────────────────────────────
        var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "avatars");
        Directory.CreateDirectory(uploadsFolder);

        // Delete previous avatar if it was one of ours (avoid orphaned files)
        if (!string.IsNullOrEmpty(user.ProfilePictureUrl))
        {
            var oldRelative = user.ProfilePictureUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
            var oldPath = Path.Combine(_env.WebRootPath, oldRelative);
            if (System.IO.File.Exists(oldPath))
                System.IO.File.Delete(oldPath);
        }

        var fileName    = $"{userId:N}_{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}{ext}";
        var filePath    = Path.Combine(uploadsFolder, fileName);
        var relativeUrl = $"/uploads/avatars/{fileName}";

        await using (var stream = System.IO.File.Create(filePath))
            await file.CopyToAsync(stream, cancellationToken);

        // ── Persist URL on User ──────────────────────────────────────────────
        user.ProfilePictureUrl = relativeUrl;
        await _userRepository.UpdateAsync(user, cancellationToken);

        // ── Also persist URL on the role-specific profile ────────────────────
        switch (user.Role)
        {
            case UserRole.Counsellor:
                var counsellorProfile = await _counsellorRepository.GetByUserIdAsync(userId, cancellationToken);
                if (counsellorProfile is not null)
                {
                    counsellorProfile.ProfileImageUrl = relativeUrl;
                    await _counsellorRepository.UpdateAsync(counsellorProfile, cancellationToken);
                }
                break;

            case UserRole.Client:
                var clientProfile = await _clientProfileRepository.GetByUserIdAsync(userId, cancellationToken);
                if (clientProfile is not null)
                {
                    clientProfile.ProfileImageUrl = relativeUrl;
                    await _clientProfileRepository.UpdateAsync(clientProfile, cancellationToken);
                }
                break;
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Ok(new UploadAvatarResponse(relativeUrl));
    }
}

public record UploadAvatarResponse(string AvatarUrl);

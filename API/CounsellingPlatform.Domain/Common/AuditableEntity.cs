namespace CounsellingPlatform.Domain.Common;

/// <summary>
/// Extends BaseEntity with full audit trail:
/// who created/updated and when, plus soft-delete flag.
/// </summary>
public abstract class AuditableEntity : BaseEntity
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }   // User email or ID of creator
    public string? UpdatedBy { get; set; }   // User email or ID of last editor
    public bool IsDeleted { get; set; } = false;
}

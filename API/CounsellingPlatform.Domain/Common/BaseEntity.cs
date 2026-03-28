namespace CounsellingPlatform.Domain.Common;

/// <summary>
/// Root base for all domain entities. Carries only the primary key.
/// </summary>
public abstract class BaseEntity
{
    public Guid Id { get; protected set; } = Guid.NewGuid();
}

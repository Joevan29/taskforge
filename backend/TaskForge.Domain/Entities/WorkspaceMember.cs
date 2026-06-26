using TaskForge.Domain.Enums;

namespace TaskForge.Domain.Entities;

public class WorkspaceMember
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid WorkspaceId { get; set; }
    public Workspace Workspace { get; set; } = null!;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public UserRole Role { get; set; } = UserRole.Member;
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}

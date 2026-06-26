using TaskForge.Domain.Enums;

namespace TaskForge.Domain.Entities;

public class Project : BaseEntity
{
    public Guid WorkspaceId { get; set; }
    public Workspace Workspace { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ProjectStatus Status { get; set; } = ProjectStatus.Active;
    public DateTime? StartDate { get; set; }
    public DateTime? DueDate { get; set; }
    public Guid? LeaderId { get; set; }
    public User? Leader { get; set; }
    public Guid CreatedById { get; set; }
    public User CreatedBy { get; set; } = null!;

    public ICollection<Board> Boards { get; set; } = new List<Board>();
}

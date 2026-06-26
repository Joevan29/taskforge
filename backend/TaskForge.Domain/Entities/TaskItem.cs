using TaskForge.Domain.Enums;

namespace TaskForge.Domain.Entities;

public class TaskItem : BaseEntity
{
    public Guid ColumnId { get; set; }
    public BoardColumn Column { get; set; } = null!;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public Guid? AssigneeId { get; set; }
    public User? Assignee { get; set; }
    public Guid CreatedById { get; set; }
    public User CreatedBy { get; set; } = null!;
    public DateTime? DueDate { get; set; }
    public int OrderIndex { get; set; } = 0;
    public decimal? EstimatedHours { get; set; }

    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public ICollection<Attachment> Attachments { get; set; } = new List<Attachment>();
    public ICollection<TimeLog> TimeLogs { get; set; } = new List<TimeLog>();
}

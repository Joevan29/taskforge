namespace TaskForge.Domain.Entities;

public class Board
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public string Name { get; set; } = "Main Board";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<BoardColumn> Columns { get; set; } = new List<BoardColumn>();
}

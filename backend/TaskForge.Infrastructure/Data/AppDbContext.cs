using Microsoft.EntityFrameworkCore;
using TaskForge.Domain.Entities;
using TaskForge.Domain.Enums;

namespace TaskForge.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<Workspace> Workspaces => Set<Workspace>();
    public DbSet<WorkspaceMember> WorkspaceMembers => Set<WorkspaceMember>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Board> Boards => Set<Board>();
    public DbSet<BoardColumn> BoardColumns => Set<BoardColumn>();
    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<Attachment> Attachments => Set<Attachment>();
    public DbSet<TimeLog> TimeLogs => Set<TimeLog>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<Label> Labels => Set<Label>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Soft delete global query filters
        modelBuilder.Entity<User>().HasQueryFilter(u => u.DeletedAt == null);
        modelBuilder.Entity<Workspace>().HasQueryFilter(w => w.DeletedAt == null);
        modelBuilder.Entity<Project>().HasQueryFilter(p => p.DeletedAt == null);
        modelBuilder.Entity<TaskItem>().HasQueryFilter(t => t.DeletedAt == null);
        modelBuilder.Entity<Comment>().HasQueryFilter(c => c.DeletedAt == null);

        // User
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

        // Workspace
        modelBuilder.Entity<Workspace>().HasIndex(w => w.Slug).IsUnique();
        modelBuilder.Entity<Workspace>()
            .HasOne(w => w.Owner)
            .WithMany()
            .HasForeignKey(w => w.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        // WorkspaceMember
        modelBuilder.Entity<WorkspaceMember>()
            .HasIndex(wm => new { wm.WorkspaceId, wm.UserId }).IsUnique();
        modelBuilder.Entity<WorkspaceMember>()
            .Property(wm => wm.Role).HasConversion<string>();

        // Project
        modelBuilder.Entity<Project>()
            .Property(p => p.Status).HasConversion<string>();
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Leader)
            .WithMany()
            .HasForeignKey(p => p.LeaderId)
            .OnDelete(DeleteBehavior.SetNull);
        modelBuilder.Entity<Project>()
            .HasOne(p => p.CreatedBy)
            .WithMany()
            .HasForeignKey(p => p.CreatedById)
            .OnDelete(DeleteBehavior.Restrict);

        // TaskItem
        modelBuilder.Entity<TaskItem>()
            .Property(t => t.Priority).HasConversion<string>();
        modelBuilder.Entity<TaskItem>()
            .HasOne(t => t.Assignee)
            .WithMany()
            .HasForeignKey(t => t.AssigneeId)
            .OnDelete(DeleteBehavior.SetNull);
        modelBuilder.Entity<TaskItem>()
            .HasOne(t => t.CreatedBy)
            .WithMany()
            .HasForeignKey(t => t.CreatedById)
            .OnDelete(DeleteBehavior.Restrict);

        // Notification
        modelBuilder.Entity<Notification>()
            .Property(n => n.Type).HasConversion<string>();

        // Indexes
        modelBuilder.Entity<TaskItem>().HasIndex(t => t.ColumnId);
        modelBuilder.Entity<TaskItem>().HasIndex(t => t.AssigneeId);
        modelBuilder.Entity<Notification>().HasIndex(n => new { n.UserId, n.IsRead, n.CreatedAt });
    }
}

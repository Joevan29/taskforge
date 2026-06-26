using System.ComponentModel.DataAnnotations;
using TaskForge.Domain.Enums;

namespace TaskForge.Application.DTOs;

public record CreateTaskRequest(
    [Required, MinLength(1)] string Title,
    string? Description,
    TaskPriority Priority = TaskPriority.Medium,
    Guid? AssigneeId = null,
    DateTime? DueDate = null
);

public record UpdateTaskRequest(
    string? Title,
    string? Description,
    TaskPriority? Priority,
    Guid? AssigneeId,
    DateTime? DueDate
);

public record MoveTaskRequest([Required] Guid TargetColumnId, int OrderIndex = 0);

public record TaskDto(
    Guid Id,
    string Title,
    string? Description,
    string Priority,
    Guid ColumnId,
    UserDto? Assignee,
    UserDto CreatedBy,
    DateTime? DueDate,
    int CommentCount,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record CommentRequest([Required, MinLength(1)] string Content);

public record CommentDto(Guid Id, string Content, UserDto User, DateTime CreatedAt);

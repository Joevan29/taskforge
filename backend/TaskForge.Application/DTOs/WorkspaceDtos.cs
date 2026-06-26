using System.ComponentModel.DataAnnotations;
using TaskForge.Domain.Enums;

namespace TaskForge.Application.DTOs;

public record CreateWorkspaceRequest(
    [Required, MinLength(2)] string Name,
    string? Description = null
);

public record WorkspaceDto(
    Guid Id,
    string Name,
    string Slug,
    string? Description,
    UserDto Owner,
    int MemberCount,
    int ProjectCount,
    DateTime CreatedAt
);

public record WorkspaceMemberDto(
    Guid Id,
    UserDto User,
    string Role,
    DateTime JoinedAt
);

public record InviteMemberRequest(
    [Required, EmailAddress] string Email,
    UserRole Role = UserRole.Member
);

public record CreateProjectRequest(
    [Required, MinLength(2)] string Name,
    string? Description,
    DateTime? StartDate,
    DateTime? DueDate
);

public record ProjectDto(
    Guid Id,
    string Name,
    string? Description,
    string Status,
    DateTime? StartDate,
    DateTime? DueDate,
    UserDto? Leader,
    int TaskCount,
    int DoneCount,
    DateTime CreatedAt
);

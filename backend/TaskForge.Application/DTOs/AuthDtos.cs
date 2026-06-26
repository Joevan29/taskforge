using System.ComponentModel.DataAnnotations;

namespace TaskForge.Application.DTOs;

public record RegisterRequest(
    [Required, EmailAddress] string Email,
    [Required, MinLength(8)] string Password,
    [Required, MinLength(2)] string FullName,
    string? WorkspaceName = null
);

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password
);

public record RefreshTokenRequest([Required] string RefreshToken);

public record AuthResponse(
    string AccessToken,
    string RefreshToken,
    UserDto User
);

public record UserDto(
    Guid Id,
    string Email,
    string FullName,
    string? AvatarUrl,
    string Role
);

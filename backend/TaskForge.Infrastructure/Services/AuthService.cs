using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TaskForge.Application.DTOs;
using TaskForge.Application.Interfaces;
using TaskForge.Domain.Entities;
using TaskForge.Infrastructure.Data;

namespace TaskForge.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        if (await _db.Users.AnyAsync(u => u.Email == request.Email))
            throw new InvalidOperationException("Email sudah terdaftar.");

        var user = new User
        {
            Email = request.Email.ToLowerInvariant(),
            FullName = request.FullName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password, 12),
            AvatarUrl = $"https://api.dicebear.com/7.x/avataaars/svg?seed={Uri.EscapeDataString(request.FullName)}",
        };

        _db.Users.Add(user);

        // Auto-create workspace if name provided
        if (!string.IsNullOrWhiteSpace(request.WorkspaceName))
        {
            var slug = GenerateSlug(request.WorkspaceName);
            var workspace = new Workspace
            {
                Name = request.WorkspaceName,
                Slug = await EnsureUniqueSlugAsync(slug),
                OwnerId = user.Id,
            };
            workspace.Members.Add(new WorkspaceMember { UserId = user.Id, Role = Domain.Enums.UserRole.Owner });
            _db.Workspaces.Add(workspace);
        }

        await _db.SaveChangesAsync();
        return await GenerateAuthResponseAsync(user, "Member");
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email.ToLowerInvariant())
            ?? throw new InvalidOperationException("Email atau password salah.");

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new InvalidOperationException("Email atau password salah.");

        user.LastLoginAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        var member = await _db.WorkspaceMembers.FirstOrDefaultAsync(m => m.UserId == user.Id);
        var role = member?.Role.ToString() ?? "Member";

        return await GenerateAuthResponseAsync(user, role);
    }

    public async Task<AuthResponse> RefreshTokenAsync(string refreshToken)
    {
        var token = await _db.RefreshTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Token == refreshToken)
            ?? throw new InvalidOperationException("Invalid refresh token.");

        if (!token.IsActive) throw new InvalidOperationException("Refresh token expired or revoked.");

        token.RevokedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return await GenerateAuthResponseAsync(token.User, "Member");
    }

    public async Task RevokeTokenAsync(string refreshToken)
    {
        var token = await _db.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken);
        if (token != null)
        {
            token.RevokedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }
    }

    public async Task<UserDto?> GetCurrentUserAsync(Guid userId)
    {
        var user = await _db.Users.FindAsync(userId);
        return user == null ? null : MapToDto(user, "Member");
    }

    private async Task<AuthResponse> GenerateAuthResponseAsync(User user, string role)
    {
        var accessToken = GenerateJwt(user, role);
        var refreshTokenStr = GenerateRefreshToken();

        var refreshToken = new RefreshToken
        {
            UserId = user.Id,
            Token = refreshTokenStr,
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };
        _db.RefreshTokens.Add(refreshToken);
        await _db.SaveChangesAsync();

        return new AuthResponse(accessToken, refreshTokenStr, MapToDto(user, role));
    }

    private string GenerateJwt(User user, string role)
    {
        var secret = _config["Jwt:Secret"] ?? "TaskForge-Super-Secret-Key-2026-MinLength32!";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim(ClaimTypes.Role, role),
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static string GenerateRefreshToken()
    {
        var bytes = new byte[64];
        RandomNumberGenerator.Fill(bytes);
        return Convert.ToBase64String(bytes);
    }

    private static UserDto MapToDto(User user, string role) =>
        new(user.Id, user.Email, user.FullName, user.AvatarUrl, role);

    private static string GenerateSlug(string name) =>
        name.ToLowerInvariant().Replace(" ", "-").Replace("_", "-");

    private async Task<string> EnsureUniqueSlugAsync(string slug)
    {
        var base_ = slug;
        var count = 1;
        while (await _db.Workspaces.AnyAsync(w => w.Slug == slug))
            slug = $"{base_}-{count++}";
        return slug;
    }
}

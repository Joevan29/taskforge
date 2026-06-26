using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using TaskForge.API.Hubs;
using TaskForge.Application.Interfaces;
using TaskForge.Infrastructure.Data;
using TaskForge.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// === SERVICES ===
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger with JWT support
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TaskForge API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Enter: Bearer {token}",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
            Array.Empty<string>()
        }
    });
});

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// JWT Authentication
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? "TaskForge-Super-Secret-Key-2026-MinLength32!";
var key = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
    // Allow SignalR to use token from query string
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                context.Token = accessToken;
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();

// SignalR
builder.Services.AddSignalR();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://localhost:3000",
            "http://localhost:3001"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

// Application Services
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// === MIDDLEWARE ===
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<WorkspaceHub>("/hubs/workspace");

// Auto-create database and seed demo data on startup in development
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        db.Database.EnsureCreated();

        // Seeding demo data
        if (!db.Users.Any())
        {
            var budi = new TaskForge.Domain.Entities.User
            {
                Id = Guid.NewGuid(),
                Email = "budi@taskforge.com",
                FullName = "Budi Santoso",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123", 12),
                AvatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var rina = new TaskForge.Domain.Entities.User
            {
                Id = Guid.NewGuid(),
                Email = "rina@taskforge.com",
                FullName = "Rina Fieldwork",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123", 12),
                AvatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            db.Users.AddRange(budi, rina);

            // Seed demo workspace
            var workspace = new TaskForge.Domain.Entities.Workspace
            {
                Id = Guid.NewGuid(),
                Name = "ShieldSafe Construction",
                Slug = "shieldsafe-construction",
                OwnerId = budi.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            db.Workspaces.Add(workspace);

            // Seed members
            db.WorkspaceMembers.AddRange(
                new TaskForge.Domain.Entities.WorkspaceMember { WorkspaceId = workspace.Id, UserId = budi.Id, Role = TaskForge.Domain.Enums.UserRole.Owner },
                new TaskForge.Domain.Entities.WorkspaceMember { WorkspaceId = workspace.Id, UserId = rina.Id, Role = TaskForge.Domain.Enums.UserRole.Member }
            );

            // Seed project
            var project = new TaskForge.Domain.Entities.Project
            {
                Id = Guid.NewGuid(),
                WorkspaceId = workspace.Id,
                Name = "ShieldSafe",
                Description = "Mengembangkan situs promosi asuransi dan kalkulator risiko keselamatan kerja.",
                Status = TaskForge.Domain.Enums.ProjectStatus.Active,
                CreatedById = budi.Id,
                LeaderId = budi.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            db.Projects.Add(project);

            // Seed board
            var board = new TaskForge.Domain.Entities.Board
            {
                Id = Guid.NewGuid(),
                ProjectId = project.Id,
                Name = "Kanban Board",
                CreatedAt = DateTime.UtcNow
            };
            db.Boards.Add(board);

            // Seed columns
            var colTodo = new TaskForge.Domain.Entities.BoardColumn { Id = Guid.NewGuid(), BoardId = board.Id, Name = "TO DO", OrderIndex = 0, CreatedAt = DateTime.UtcNow };
            var colProgress = new TaskForge.Domain.Entities.BoardColumn { Id = Guid.NewGuid(), BoardId = board.Id, Name = "IN PROGRESS", OrderIndex = 1, CreatedAt = DateTime.UtcNow };
            var colReview = new TaskForge.Domain.Entities.BoardColumn { Id = Guid.NewGuid(), BoardId = board.Id, Name = "CLIENT REVIEW", OrderIndex = 2, CreatedAt = DateTime.UtcNow };
            var colDone = new TaskForge.Domain.Entities.BoardColumn { Id = Guid.NewGuid(), BoardId = board.Id, Name = "DONE", OrderIndex = 3, CreatedAt = DateTime.UtcNow };

            db.BoardColumns.AddRange(colTodo, colProgress, colReview, colDone);

            // Seed tasks
            db.Tasks.AddRange(
                new TaskForge.Domain.Entities.TaskItem
                {
                    Id = Guid.NewGuid(),
                    ColumnId = colTodo.Id,
                    Title = "Setup Database Schema",
                    Description = "Buat semua tabel database sesuai schema final",
                    Priority = TaskForge.Domain.Enums.TaskPriority.High,
                    CreatedById = budi.Id,
                    AssigneeId = rina.Id,
                    DueDate = DateTime.UtcNow.AddDays(5),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new TaskForge.Domain.Entities.TaskItem
                {
                    Id = Guid.NewGuid(),
                    ColumnId = colProgress.Id,
                    Title = "Build Auth UI",
                    Description = "Login dan Register dengan dark mode premium",
                    Priority = TaskForge.Domain.Enums.TaskPriority.High,
                    CreatedById = budi.Id,
                    AssigneeId = budi.Id,
                    DueDate = DateTime.UtcNow.AddDays(2),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new TaskForge.Domain.Entities.TaskItem
                {
                    Id = Guid.NewGuid(),
                    ColumnId = colDone.Id,
                    Title = "UX Research Complete",
                    Description = "User flow, persona, dan wireframe awal",
                    Priority = TaskForge.Domain.Enums.TaskPriority.Medium,
                    CreatedById = budi.Id,
                    AssigneeId = budi.Id,
                    DueDate = DateTime.UtcNow.AddDays(-3),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            );

            db.SaveChanges();
            Console.WriteLine("Database successfully initialized and seeded with demo data.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error initializing database: {ex.Message}");
    }
}

app.Run();

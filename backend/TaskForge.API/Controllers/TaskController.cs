using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskForge.Application.DTOs;

namespace TaskForge.API.Controllers;

[ApiController]
[Route("api")]
[Authorize]
public class TaskController : ControllerBase
{
    [HttpGet("columns/{columnId}/tasks")]
    public IActionResult GetTasks(Guid columnId) =>
        Ok(new[] {
            new { Id = Guid.NewGuid(), Title = "Build Auth UI", Priority = "High", ColumnId = columnId },
            new { Id = Guid.NewGuid(), Title = "Implement SignalR Hub", Priority = "Urgent", ColumnId = columnId }
        });

    [HttpPost("columns/{columnId}/tasks")]
    public IActionResult CreateTask(Guid columnId, [FromBody] CreateTaskRequest request) =>
        Ok(new { Id = Guid.NewGuid(), Title = request.Title, Priority = request.Priority.ToString(), ColumnId = columnId });

    [HttpGet("tasks/{id}")]
    public IActionResult GetTask(Guid id) =>
        Ok(new { Id = id, Title = "Build Auth UI", Priority = "High", Description = "Login & Register UI" });

    [HttpPatch("tasks/{id}/move")]
    public IActionResult MoveTask(Guid id, [FromBody] MoveTaskRequest request) =>
        Ok(new { Id = id, ColumnId = request.TargetColumnId, OrderIndex = request.OrderIndex });

    [HttpPost("tasks/{id}/comments")]
    public IActionResult AddComment(Guid id, [FromBody] CommentRequest request) =>
        Ok(new { Id = Guid.NewGuid(), Content = request.Content, CreatedAt = DateTime.UtcNow });

    [HttpGet("tasks/{id}/comments")]
    public IActionResult GetComments(Guid id) =>
        Ok(new[] {
            new { Id = Guid.NewGuid(), Content = "Pastikan dark mode smooth ya!", CreatedAt = DateTime.UtcNow.AddHours(-2) }
        });
}

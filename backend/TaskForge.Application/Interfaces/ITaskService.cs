using TaskForge.Application.DTOs;

namespace TaskForge.Application.Interfaces;

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetTasksByColumnAsync(Guid columnId);
    Task<TaskDto?> GetTaskByIdAsync(Guid taskId);
    Task<TaskDto> CreateTaskAsync(Guid columnId, Guid userId, CreateTaskRequest request);
    Task<TaskDto> UpdateTaskAsync(Guid taskId, Guid userId, UpdateTaskRequest request);
    Task DeleteTaskAsync(Guid taskId, Guid userId);
    Task<TaskDto> MoveTaskAsync(Guid taskId, Guid userId, MoveTaskRequest request);
    Task<CommentDto> AddCommentAsync(Guid taskId, Guid userId, CommentRequest request);
    Task<IEnumerable<CommentDto>> GetCommentsAsync(Guid taskId);
}

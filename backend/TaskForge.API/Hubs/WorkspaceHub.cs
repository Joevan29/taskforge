using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace TaskForge.API.Hubs;

[Authorize]
public class WorkspaceHub : Hub
{
    private static readonly Dictionary<string, string> _userConnections = new();

    public override async Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;
        if (userId != null) _userConnections[userId] = Context.ConnectionId;
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.UserIdentifier;
        if (userId != null) _userConnections.Remove(userId);
        await base.OnDisconnectedAsync(exception);
    }

    public async Task JoinWorkspace(string workspaceId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"workspace_{workspaceId}");
        await Clients.Caller.SendAsync("JoinedWorkspace", workspaceId);
    }

    public async Task LeaveWorkspace(string workspaceId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"workspace_{workspaceId}");
    }

    // Called by services to broadcast task updates
    public async Task BroadcastTaskUpdate(string workspaceId, object taskData)
    {
        await Clients.Group($"workspace_{workspaceId}").SendAsync("TaskUpdated", taskData);
    }
}

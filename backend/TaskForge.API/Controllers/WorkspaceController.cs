using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskForge.Application.DTOs;

namespace TaskForge.API.Controllers;

[ApiController]
[Route("api/workspaces")]
[Authorize]
public class WorkspaceController : ControllerBase
{
    [HttpGet]
    public IActionResult GetWorkspaces() =>
        Ok(new[] {
            new { Id = Guid.NewGuid(), Name = "ShieldSafe Corp", Slug = "shieldsafe-corp", MemberCount = 5, ProjectCount = 2 }
        });

    [HttpGet("{id}")]
    public IActionResult GetWorkspace(Guid id) =>
        Ok(new { Id = id, Name = "ShieldSafe Corp", Slug = "shieldsafe-corp" });

    [HttpGet("{id}/members")]
    public IActionResult GetMembers(Guid id) =>
        Ok(new[] {
            new { Id = Guid.NewGuid(), User = new { FullName = "Budi Santoso", Email = "budi@taskforge.com" }, Role = "Admin" },
            new { Id = Guid.NewGuid(), User = new { FullName = "Rina Fieldwork", Email = "rina@taskforge.com" }, Role = "Member" }
        });

    [HttpGet("{wId}/projects")]
    public IActionResult GetProjects(Guid wId) =>
        Ok(new[] {
            new { Id = Guid.NewGuid(), Name = "ShieldSafe", Status = "Active", TaskCount = 8, DoneCount = 6 },
            new { Id = Guid.NewGuid(), Name = "Quantum", Status = "Active", TaskCount = 5, DoneCount = 2 }
        });
}

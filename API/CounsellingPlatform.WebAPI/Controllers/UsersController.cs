using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using CounsellingPlatform.Application.DTOs.User;
using CounsellingPlatform.Application.Features.Users.Commands;
using CounsellingPlatform.Application.Features.Users.Queries;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>Get all users, optionally filtered by role (admin only)</summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<UserListDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] UserRole? role, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetAllUsersQuery(role), cancellationToken);
        return Ok(result);
    }

    /// <summary>Toggle a user's active status (admin only)</summary>
    [HttpPatch("{id:guid}/toggle-status")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ToggleStatus(Guid id, CancellationToken cancellationToken)
    {
        var isActive = await _mediator.Send(new ToggleUserStatusCommand(id), cancellationToken);
        return Ok(new { isActive });
    }
}

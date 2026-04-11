using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using CounsellingPlatform.Application.DTOs.Client;
using CounsellingPlatform.Application.Features.Clients.Commands;
using CounsellingPlatform.Application.Features.Clients.Queries;

namespace CounsellingPlatform.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Client")]
public class ClientsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ClientsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>Get the authenticated client's profile</summary>
    [HttpGet("me")]
    [ProducesResponseType(typeof(ClientProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMyProfile(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var result = await _mediator.Send(new GetMyClientProfileQuery(userId.Value), cancellationToken);
        return Ok(result);
    }

    /// <summary>Create or update the authenticated client's profile</summary>
    [HttpPut("me")]
    [ProducesResponseType(typeof(ClientProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpsertMyProfile([FromBody] UpdateClientProfileDto dto, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var result = await _mediator.Send(new UpsertClientProfileCommand(userId.Value, dto), cancellationToken);
        return Ok(result);
    }

    private Guid? GetCurrentUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        return Guid.TryParse(claim, out var id) ? id : null;
    }
}

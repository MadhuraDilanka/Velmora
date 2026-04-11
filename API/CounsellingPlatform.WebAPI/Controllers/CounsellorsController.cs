using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using CounsellingPlatform.Application.DTOs.Counsellor;
using CounsellingPlatform.Application.Features.Counsellors.Commands;
using CounsellingPlatform.Application.Features.Counsellors.Queries;

namespace CounsellingPlatform.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CounsellorsController : ControllerBase
{
    private readonly IMediator _mediator;

    public CounsellorsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>Get all approved and available counsellors (public)</summary>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<CounsellorProfileDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetApprovedCounsellors(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetApprovedCounsellorsQuery(), cancellationToken);
        return Ok(result);
    }

    /// <summary>Get a single approved counsellor by ID (public)</summary>
    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(CounsellorProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetCounsellorByIdQuery(id), cancellationToken);
        return Ok(result);
    }

    /// <summary>Get all pending counsellor applications (admin only)</summary>
    [HttpGet("pending")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(IEnumerable<CounsellorProfileDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPending(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetPendingCounsellorsQuery(), cancellationToken);
        return Ok(result);
    }

    /// <summary>Get the authenticated counsellor's own profile</summary>
    [HttpGet("me")]
    [Authorize(Roles = "Counsellor")]
    [ProducesResponseType(typeof(CounsellorProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyProfile(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var result = await _mediator.Send(new GetMyCounsellorProfileQuery(userId.Value), cancellationToken);
        if (result is null) return NotFound(new { message = "Profile not found. Please complete your profile setup." });
        return Ok(result);
    }

    /// <summary>Create or update the authenticated counsellor's profile</summary>
    [HttpPut("me")]
    [Authorize(Roles = "Counsellor")]
    [ProducesResponseType(typeof(CounsellorProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpsertMyProfile([FromBody] UpdateCounsellorProfileDto dto, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var result = await _mediator.Send(new UpsertCounsellorProfileCommand(userId.Value, dto), cancellationToken);
        return Ok(result);
    }

    /// <summary>Approve a counsellor (admin only)</summary>
    [HttpPost("{id:guid}/approve")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Approve(Guid id, CancellationToken cancellationToken)
    {
        await _mediator.Send(new ApproveCounsellorCommand(id), cancellationToken);
        return NoContent();
    }

    /// <summary>Reject a counsellor application (admin only)</summary>
    [HttpPost("{id:guid}/reject")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Reject(Guid id, [FromBody] RejectCounsellorRequest request, CancellationToken cancellationToken)
    {
        await _mediator.Send(new RejectCounsellorCommand(id, request.Reason), cancellationToken);
        return NoContent();
    }

    private Guid? GetCurrentUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        return Guid.TryParse(claim, out var id) ? id : null;
    }
}

public record RejectCounsellorRequest(string? Reason);

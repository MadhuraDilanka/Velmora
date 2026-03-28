using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using CounsellingPlatform.Application.DTOs.Counsellor;
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

    /// <summary>Get all approved and available counsellors</summary>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<CounsellorProfileDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetApprovedCounsellors(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetApprovedCounsellorsQuery(), cancellationToken);
        return Ok(result);
    }
}

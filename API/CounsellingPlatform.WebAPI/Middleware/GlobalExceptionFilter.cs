using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using CounsellingPlatform.Application.Common.Exceptions;

namespace CounsellingPlatform.WebAPI.Middleware;

public class GlobalExceptionFilter : IExceptionFilter
{
    private readonly ILogger<GlobalExceptionFilter> _logger;

    public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger)
    {
        _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        _logger.LogError(context.Exception, "Unhandled exception occurred.");

        var (statusCode, response) = context.Exception switch
        {
            NotFoundException ex => (StatusCodes.Status404NotFound, new { message = ex.Message }),
            Application.Common.Exceptions.ValidationException ex => (StatusCodes.Status400BadRequest, (object)new { message = "Validation failed.", errors = ex.Errors }),
            UnauthorizedException ex => (StatusCodes.Status401Unauthorized, new { message = ex.Message }),
            InvalidOperationException ex => (StatusCodes.Status400BadRequest, new { message = ex.Message }),
            _ => (StatusCodes.Status500InternalServerError, new { message = "An unexpected error occurred." })
        };

        context.Result = new ObjectResult(response) { StatusCode = statusCode };
        context.ExceptionHandled = true;
    }
}

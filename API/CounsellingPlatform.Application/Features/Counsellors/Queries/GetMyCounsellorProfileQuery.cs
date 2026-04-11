using MediatR;
using CounsellingPlatform.Application.Common.Exceptions;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Application.DTOs.Counsellor;

namespace CounsellingPlatform.Application.Features.Counsellors.Queries;

public record GetMyCounsellorProfileQuery(Guid UserId) : IRequest<CounsellorProfileDto?>;

public class GetMyCounsellorProfileQueryHandler : IRequestHandler<GetMyCounsellorProfileQuery, CounsellorProfileDto?>
{
    private readonly ICounsellorRepository _counsellorRepository;

    public GetMyCounsellorProfileQueryHandler(ICounsellorRepository counsellorRepository)
    {
        _counsellorRepository = counsellorRepository;
    }

    public async Task<CounsellorProfileDto?> Handle(GetMyCounsellorProfileQuery request, CancellationToken cancellationToken)
    {
        var c = await _counsellorRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        if (c is null) return null;

        return new CounsellorProfileDto
        {
            Id = c.Id,
            UserId = c.UserId,
            FullName = c.User?.FullName ?? string.Empty,
            Email = c.User?.Email ?? string.Empty,
            Bio = c.Bio,
            Specializations = c.Specializations,
            Qualifications = c.Qualifications,
            Languages = c.Languages,
            YearsOfExperience = c.YearsOfExperience,
            ProfessionalTitle = c.ProfessionalTitle,
            SessionFee = c.SessionFee,
            IsVerified = c.IsVerified,
            SessionDurationMinutes = c.SessionDurationMinutes,
            ProfileImageUrl = c.ProfileImageUrl,
            IsAvailableOnline = c.IsAvailableOnline,
            IsAvailableInPerson = c.IsAvailableInPerson,
            ApprovalStatus = c.ApprovalStatus,
            AverageRating = c.AverageRating,
            TotalReviews = c.TotalReviews,
            IsAvailable = c.IsAvailable
        };
    }
}

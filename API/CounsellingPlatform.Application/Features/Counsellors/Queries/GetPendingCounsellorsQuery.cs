using MediatR;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Application.DTOs.Counsellor;

namespace CounsellingPlatform.Application.Features.Counsellors.Queries;

public record GetPendingCounsellorsQuery : IRequest<IEnumerable<CounsellorProfileDto>>;

public class GetPendingCounsellorsQueryHandler : IRequestHandler<GetPendingCounsellorsQuery, IEnumerable<CounsellorProfileDto>>
{
    private readonly ICounsellorRepository _counsellorRepository;

    public GetPendingCounsellorsQueryHandler(ICounsellorRepository counsellorRepository)
    {
        _counsellorRepository = counsellorRepository;
    }

    public async Task<IEnumerable<CounsellorProfileDto>> Handle(GetPendingCounsellorsQuery request, CancellationToken cancellationToken)
    {
        var counsellors = await _counsellorRepository.GetPendingApprovalAsync(cancellationToken);

        return counsellors.Select(c => new CounsellorProfileDto
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
        });
    }
}

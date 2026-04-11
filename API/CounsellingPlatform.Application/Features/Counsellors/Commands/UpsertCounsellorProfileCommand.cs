using MediatR;
using CounsellingPlatform.Application.Common.Exceptions;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Application.DTOs.Counsellor;
using CounsellingPlatform.Domain.Entities;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Application.Features.Counsellors.Commands;

public record UpsertCounsellorProfileCommand(Guid UserId, UpdateCounsellorProfileDto Dto) : IRequest<CounsellorProfileDto>;

public class UpsertCounsellorProfileCommandHandler : IRequestHandler<UpsertCounsellorProfileCommand, CounsellorProfileDto>
{
    private readonly ICounsellorRepository _counsellorRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpsertCounsellorProfileCommandHandler(
        ICounsellorRepository counsellorRepository,
        IUserRepository userRepository,
        IUnitOfWork unitOfWork)
    {
        _counsellorRepository = counsellorRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<CounsellorProfileDto> Handle(UpsertCounsellorProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(User), request.UserId);

        var existing = await _counsellorRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        var dto = request.Dto;

        if (existing is null)
        {
            existing = new CounsellorProfile
            {
                UserId = request.UserId,
                ApprovalStatus = ApprovalStatus.Pending
            };
            ApplyUpdate(existing, dto);
            await _counsellorRepository.AddAsync(existing, cancellationToken);
        }
        else
        {
            ApplyUpdate(existing, dto);
            await _counsellorRepository.UpdateAsync(existing, cancellationToken);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new CounsellorProfileDto
        {
            Id = existing.Id,
            UserId = existing.UserId,
            FullName = user.FullName,
            Email = user.Email,
            Bio = existing.Bio,
            Specializations = existing.Specializations,
            Qualifications = existing.Qualifications,
            Languages = existing.Languages,
            YearsOfExperience = existing.YearsOfExperience,
            ProfessionalTitle = existing.ProfessionalTitle,
            SessionFee = existing.SessionFee,
            IsVerified = existing.IsVerified,
            SessionDurationMinutes = existing.SessionDurationMinutes,
            ProfileImageUrl = existing.ProfileImageUrl,
            IsAvailableOnline = existing.IsAvailableOnline,
            IsAvailableInPerson = existing.IsAvailableInPerson,
            ApprovalStatus = existing.ApprovalStatus,
            AverageRating = existing.AverageRating,
            TotalReviews = existing.TotalReviews,
            IsAvailable = existing.IsAvailable
        };
    }

    private static void ApplyUpdate(CounsellorProfile profile, UpdateCounsellorProfileDto dto)
    {
        profile.ProfessionalTitle = dto.ProfessionalTitle;
        profile.Bio = dto.Bio;
        profile.Specializations = dto.Specializations;
        profile.Qualifications = dto.Qualifications;
        profile.Languages = dto.Languages;
        profile.YearsOfExperience = dto.YearsOfExperience;
        profile.SessionFee = dto.SessionFee;
        profile.SessionDurationMinutes = dto.SessionDurationMinutes;
        profile.IsAvailableOnline = dto.IsAvailableOnline;
        profile.IsAvailableInPerson = dto.IsAvailableInPerson;
        profile.IsAvailable = dto.IsAvailable;
        profile.LinkedInUrl = dto.LinkedInUrl;
    }
}

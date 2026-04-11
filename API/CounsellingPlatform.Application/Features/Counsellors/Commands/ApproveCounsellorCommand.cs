using MediatR;
using CounsellingPlatform.Application.Common.Exceptions;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Application.Features.Counsellors.Commands;

public record ApproveCounsellorCommand(Guid CounsellorProfileId) : IRequest;

public class ApproveCounsellorCommandHandler : IRequestHandler<ApproveCounsellorCommand>
{
    private readonly ICounsellorRepository _counsellorRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ApproveCounsellorCommandHandler(ICounsellorRepository counsellorRepository, IUnitOfWork unitOfWork)
    {
        _counsellorRepository = counsellorRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(ApproveCounsellorCommand request, CancellationToken cancellationToken)
    {
        var profile = await _counsellorRepository.GetByIdAsync(request.CounsellorProfileId, cancellationToken)
            ?? throw new NotFoundException(nameof(Domain.Entities.CounsellorProfile), request.CounsellorProfileId);

        if (profile.ApprovalStatus == ApprovalStatus.Approved)
            throw new InvalidOperationException("Counsellor is already approved.");

        profile.ApprovalStatus = ApprovalStatus.Approved;
        profile.IsVerified = true;
        profile.ApprovedAt = DateTime.UtcNow;
        profile.RejectionReason = null;

        await _counsellorRepository.UpdateAsync(profile, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}

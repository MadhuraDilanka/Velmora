using MediatR;
using CounsellingPlatform.Application.Common.Exceptions;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Application.Features.Counsellors.Commands;

public record RejectCounsellorCommand(Guid CounsellorProfileId, string? Reason) : IRequest;

public class RejectCounsellorCommandHandler : IRequestHandler<RejectCounsellorCommand>
{
    private readonly ICounsellorRepository _counsellorRepository;
    private readonly IUnitOfWork _unitOfWork;

    public RejectCounsellorCommandHandler(ICounsellorRepository counsellorRepository, IUnitOfWork unitOfWork)
    {
        _counsellorRepository = counsellorRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(RejectCounsellorCommand request, CancellationToken cancellationToken)
    {
        var profile = await _counsellorRepository.GetByIdAsync(request.CounsellorProfileId, cancellationToken)
            ?? throw new NotFoundException(nameof(Domain.Entities.CounsellorProfile), request.CounsellorProfileId);

        profile.ApprovalStatus = ApprovalStatus.Rejected;
        profile.IsVerified = false;
        profile.RejectionReason = request.Reason;

        await _counsellorRepository.UpdateAsync(profile, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}

using MediatR;
using CounsellingPlatform.Application.Common.Exceptions;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Domain.Entities;

namespace CounsellingPlatform.Application.Features.Users.Commands;

public record ToggleUserStatusCommand(Guid UserId) : IRequest<bool>;

public class ToggleUserStatusCommandHandler : IRequestHandler<ToggleUserStatusCommand, bool>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ToggleUserStatusCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> Handle(ToggleUserStatusCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(User), request.UserId);

        user.IsActive = !user.IsActive;

        await _userRepository.UpdateAsync(user, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return user.IsActive;
    }
}

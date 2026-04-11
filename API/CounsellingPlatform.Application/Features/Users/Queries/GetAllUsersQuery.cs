using MediatR;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Application.DTOs.User;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Application.Features.Users.Queries;

public record GetAllUsersQuery(UserRole? RoleFilter = null) : IRequest<IEnumerable<UserListDto>>;

public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserListDto>>
{
    private readonly IUserRepository _userRepository;

    public GetAllUsersQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<UserListDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        var users = await _userRepository.GetAllAsync(cancellationToken);

        if (request.RoleFilter.HasValue)
            users = users.Where(u => u.Role == request.RoleFilter.Value);

        return users
            .Where(u => !u.IsDeleted)
            .Select(u => new UserListDto
            {
                Id = u.Id,
                FullName = u.FullName,
                Email = u.Email,
                Role = u.Role,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt,
                LastLoginAt = u.LastLoginAt,
                PhoneNumber = u.PhoneNumber
            });
    }
}

using MediatR;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Application.DTOs.Admin;
using CounsellingPlatform.Domain.Enums;

namespace CounsellingPlatform.Application.Features.Admin.Queries;

public record GetAdminStatsQuery : IRequest<AdminStatsDto>;

public class GetAdminStatsQueryHandler : IRequestHandler<GetAdminStatsQuery, AdminStatsDto>
{
    private readonly IUserRepository _userRepository;
    private readonly ICounsellorRepository _counsellorRepository;

    public GetAdminStatsQueryHandler(IUserRepository userRepository, ICounsellorRepository counsellorRepository)
    {
        _userRepository = userRepository;
        _counsellorRepository = counsellorRepository;
    }

    public async Task<AdminStatsDto> Handle(GetAdminStatsQuery request, CancellationToken cancellationToken)
    {
        var allUsers = (await _userRepository.GetAllAsync(cancellationToken))
            .Where(u => !u.IsDeleted)
            .ToList();

        var pendingCounsellors = await _counsellorRepository.GetPendingApprovalAsync(cancellationToken);
        var approvedCounsellors = await _counsellorRepository.GetAllApprovedAsync(cancellationToken);

        var now = DateTime.UtcNow;
        var startOfMonth = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);

        return new AdminStatsDto
        {
            TotalUsers = allUsers.Count,
            TotalClients = allUsers.Count(u => u.Role == UserRole.Client),
            TotalCounsellors = allUsers.Count(u => u.Role == UserRole.Counsellor),
            PendingApprovals = pendingCounsellors.Count(),
            ActiveCounsellors = approvedCounsellors.Count(),
            NewUsersThisMonth = allUsers.Count(u => u.CreatedAt >= startOfMonth)
        };
    }
}

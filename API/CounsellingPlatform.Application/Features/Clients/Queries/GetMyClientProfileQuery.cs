using MediatR;
using CounsellingPlatform.Application.Common.Exceptions;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Application.DTOs.Client;
using CounsellingPlatform.Domain.Entities;

namespace CounsellingPlatform.Application.Features.Clients.Queries;

public record GetMyClientProfileQuery(Guid UserId) : IRequest<ClientProfileDto>;

public class GetMyClientProfileQueryHandler : IRequestHandler<GetMyClientProfileQuery, ClientProfileDto>
{
    private readonly IClientProfileRepository _clientProfileRepository;
    private readonly IUserRepository _userRepository;

    public GetMyClientProfileQueryHandler(IClientProfileRepository clientProfileRepository, IUserRepository userRepository)
    {
        _clientProfileRepository = clientProfileRepository;
        _userRepository = userRepository;
    }

    public async Task<ClientProfileDto> Handle(GetMyClientProfileQuery request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(User), request.UserId);

        var profile = await _clientProfileRepository.GetByUserIdAsync(request.UserId, cancellationToken);

        // Return basic info even if no extended profile exists yet
        return new ClientProfileDto
        {
            Id = profile?.Id ?? Guid.Empty,
            UserId = request.UserId,
            FullName = user.FullName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            DateOfBirth = profile?.DateOfBirth,
            Gender = profile?.Gender,
            Nationality = profile?.Nationality,
            Occupation = profile?.Occupation,
            AddressLine1 = profile?.AddressLine1,
            AddressLine2 = profile?.AddressLine2,
            City = profile?.City,
            State = profile?.State,
            Country = profile?.Country,
            PostalCode = profile?.PostalCode,
            EmergencyContactName = profile?.EmergencyContactName,
            EmergencyContactPhone = profile?.EmergencyContactPhone,
            EmergencyContactRelationship = profile?.EmergencyContactRelationship,
            PreferredLanguage = profile?.PreferredLanguage,
            ProfileImageUrl = profile?.ProfileImageUrl,
            Notes = profile?.Notes
        };
    }
}

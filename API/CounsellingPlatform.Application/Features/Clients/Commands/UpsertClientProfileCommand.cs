using MediatR;
using CounsellingPlatform.Application.Common.Exceptions;
using CounsellingPlatform.Application.Common.Interfaces;
using CounsellingPlatform.Application.DTOs.Client;
using CounsellingPlatform.Domain.Entities;

namespace CounsellingPlatform.Application.Features.Clients.Commands;

public record UpsertClientProfileCommand(Guid UserId, UpdateClientProfileDto Dto) : IRequest<ClientProfileDto>;

public class UpsertClientProfileCommandHandler : IRequestHandler<UpsertClientProfileCommand, ClientProfileDto>
{
    private readonly IClientProfileRepository _clientProfileRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpsertClientProfileCommandHandler(
        IClientProfileRepository clientProfileRepository,
        IUserRepository userRepository,
        IUnitOfWork unitOfWork)
    {
        _clientProfileRepository = clientProfileRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ClientProfileDto> Handle(UpsertClientProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(User), request.UserId);

        var existing = await _clientProfileRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        var dto = request.Dto;

        if (existing is null)
        {
            existing = new ClientProfile { UserId = request.UserId };
            ApplyUpdate(existing, dto);
            await _clientProfileRepository.AddAsync(existing, cancellationToken);
        }
        else
        {
            ApplyUpdate(existing, dto);
            await _clientProfileRepository.UpdateAsync(existing, cancellationToken);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new ClientProfileDto
        {
            Id = existing.Id,
            UserId = existing.UserId,
            FullName = user.FullName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            DateOfBirth = existing.DateOfBirth,
            Gender = existing.Gender,
            Nationality = existing.Nationality,
            Occupation = existing.Occupation,
            AddressLine1 = existing.AddressLine1,
            AddressLine2 = existing.AddressLine2,
            City = existing.City,
            State = existing.State,
            Country = existing.Country,
            PostalCode = existing.PostalCode,
            EmergencyContactName = existing.EmergencyContactName,
            EmergencyContactPhone = existing.EmergencyContactPhone,
            EmergencyContactRelationship = existing.EmergencyContactRelationship,
            PreferredLanguage = existing.PreferredLanguage,
            ProfileImageUrl = existing.ProfileImageUrl,
            Notes = existing.Notes
        };
    }

    private static void ApplyUpdate(ClientProfile profile, UpdateClientProfileDto dto)
    {
        profile.DateOfBirth = dto.DateOfBirth;
        profile.Gender = dto.Gender;
        profile.Nationality = dto.Nationality;
        profile.Occupation = dto.Occupation;
        profile.AddressLine1 = dto.AddressLine1;
        profile.AddressLine2 = dto.AddressLine2;
        profile.City = dto.City;
        profile.State = dto.State;
        profile.Country = dto.Country;
        profile.PostalCode = dto.PostalCode;
        profile.EmergencyContactName = dto.EmergencyContactName;
        profile.EmergencyContactPhone = dto.EmergencyContactPhone;
        profile.EmergencyContactRelationship = dto.EmergencyContactRelationship;
        profile.PreferredLanguage = dto.PreferredLanguage;
        profile.Notes = dto.Notes;
    }
}

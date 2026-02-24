using AssistMate.Application.Services.DTOs;
using AssistMate.Domain.Entities;

namespace AssistMate.Application.Common.Mappings
{
    public static class AssistantMapper
    {
        public static AssistantListDto ToAssistantListDto(this User user)
        {
            return new AssistantListDto(
                user.Id,
                user.FirstName,
                user.LastName
            );
        }

        public static AssistantProfileDto ToAssistantProfileDto(this User user)
        {
            return new AssistantProfileDto(
                user.Id,
                user.FirstName,
                user.LastName,
                user.AssistantServices
                    .Select(x => x.Service.ToServiceDto())
                    .ToList()
            );
        }
    }
}
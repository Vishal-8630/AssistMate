using AssistMate.Application.Services.DTOs;
using AssistMate.Domain.Entities;

namespace AssistMate.Application.Common.Mappings
{
    public static class ServiceMapper
    {
        public static ServiceDto ToServiceDto(this Service service)
        {
            return new ServiceDto(
                service.Id,
                service.Name,
                service.Description
            );
        }
    }
}
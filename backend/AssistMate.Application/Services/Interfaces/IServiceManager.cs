using AssistMate.Application.Services.DTOs;

namespace AssistMate.Application.Services.Interfaces
{
    public interface IServiceManager
    {
        Task<List<ServiceDto>> GetAllServicesAsync();
        Task UpdateAssistantServicesAsync(Guid userId, UpdateAssistantServicesRequest request, CancellationToken cancellation);
        Task<List<ServiceDto>> GetMyServicesAsync(Guid userId);
    }
}
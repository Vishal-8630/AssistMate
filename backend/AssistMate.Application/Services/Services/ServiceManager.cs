using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Common.Mappings;
using AssistMate.Application.Services.DTOs;
using AssistMate.Application.Services.Interfaces;
using AssistMate.Domain.Entities;
using AssistMate.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Services.Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly IAppDbContext _dbContext;

        public ServiceManager(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<ServiceDto>> GetAllServicesAsync()
        {
            return await _dbContext.Services
                .Select(s => s.ToServiceDto())
                .ToListAsync();
        }

        public async Task<List<ServiceDto>> GetMyServicesAsync(Guid userId)
        {
            return await _dbContext.AssistantServices
                .Where(x => x.AssistantId == userId)
                .Select(x => x.Service.ToServiceDto())
                .ToListAsync();
        }

        public async Task UpdateAssistantServicesAsync(Guid userId, UpdateAssistantServicesRequest request, CancellationToken cancellationToken = default)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

            if (user == null)
                throw new AppException("User not found", 404);

            if (user.Role != UserRole.Assistant)
                throw new AppException("Only assistants can select services.");

            var requestServiceIds = request.ServiceIds
                .Distinct()
                .ToList();

            var validServiceIds = await _dbContext.Services
                .Where(s => request.ServiceIds.Contains(s.Id))
                .Select(s => s.Id)
                .ToListAsync(cancellationToken);

            if (validServiceIds.Count != requestServiceIds.Count)
                throw new AppException("One or more services are invalid.");

            var existingMappings = await _dbContext.AssistantServices
                .Where(x => x.AssistantId == userId)
                .ToListAsync(cancellationToken);

            _dbContext.AssistantServices.RemoveRange(existingMappings);

            var newMappings = validServiceIds
                .Select(serviceId => new AssistantService(userId, serviceId))
                .ToList();

            await _dbContext.AssistantServices.AddRangeAsync(newMappings, cancellationToken);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<AssistantListDto>> GetAssistantsByServiceAsync(Guid serviceId)
        {
            if (serviceId == Guid.Empty)
                throw new AppException("Invalid service id.");

            var serviceExists = await _dbContext.Services
                .AsNoTracking()
                .AnyAsync(s => s.Id == serviceId);

            if (!serviceExists)
                throw new AppException("Service not found", 404);

            var assistants = await _dbContext.AssistantServices
                .AsNoTracking()
                .Where(x => x.ServiceId == serviceId)
                .Select(x => x.Assistant)
                .Where(u => u.Role == UserRole.Assistant && u.IsActive && u.IsProfileCompleted)
                .Select(u => u.ToAssistantListDto())
                .ToListAsync();

            return assistants;
        }

        public async Task<AssistantProfileDto> GetAssistantByIdAsync(Guid assistantId)
        {
            if (assistantId == Guid.Empty)
                throw new AppException("Invalid assistant id.");

            var assistant = await _dbContext.Users
                .AsNoTracking()
                .Include(u => u.AssistantServices)
                    .ThenInclude(x => x.Service)
                .FirstOrDefaultAsync(u =>
                    u.Id == assistantId &&
                    u.Role == UserRole.Assistant &&
                    u.IsActive &&
                    u.IsProfileCompleted
               );

            if (assistant == null)
                throw new AppException("Assistant not found", 404);

            return assistant.ToAssistantProfileDto();
        }
    }
}
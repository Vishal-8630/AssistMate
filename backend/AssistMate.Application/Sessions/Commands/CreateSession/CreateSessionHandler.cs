using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Domain.Entities;
using AssistMate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Sessions.Commands.CreateSession
{
    public class CreateSessionHandler : IRequestHandler<CreateSessionCommand, CreateSessionResponse>
    {
        private readonly IAppDbContext _dbContext;

        public CreateSessionHandler(IAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CreateSessionResponse> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
        {
            var assistant = await _dbContext.Users
                .Include(u => u.AssistantServices)
                .FirstOrDefaultAsync(u => u.Id == request.AssistantId && u.Role == UserRole.Assistant, cancellationToken);

            if (assistant == null)
                throw new AppException("Assistant not found", 404);

            var providesService = assistant.AssistantServices
                .Any(x => x.ServiceId == request.ServiceId);

            if (!providesService)
                throw new AppException("Assistant does not provide the service.");

            var session = new Session()
            {
                Id = Guid.NewGuid(),
                ClientId = request.ClientId,
                AssistantId = request.AssistantId,
                ServiceId = request.ServiceId,
                Status = SessionStatus.Requested,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.Sessions.Add(session);

            try
            {
                await _dbContext.SaveChangesAsync(cancellationToken);
            }
            catch (DbUpdateException)
            {
                throw new AppException("An active or pending session already exists."); 
            }

            return new CreateSessionResponse(SessionId: session.Id, Status: session.Status.ToString());
        }
    }
}
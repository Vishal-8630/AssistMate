using MediatR;

namespace AssistMate.Application.Sessions.Commands.CreateSession
{
    public record CreateSessionCommand(Guid ClientId, Guid AssistantId, Guid ServiceId) : IRequest<CreateSessionResponse>;
}
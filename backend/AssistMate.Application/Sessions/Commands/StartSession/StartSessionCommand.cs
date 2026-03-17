using MediatR;

namespace AssistMate.Application.Sessions.Commands.StartSession
{
    public record StartSessionCommand(Guid ClientId, Guid AssistantId, Guid ServiceId) : IRequest<StartSessionResponse>;
}
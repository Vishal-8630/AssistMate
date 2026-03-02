using MediatR;

namespace AssistMate.Application.Sessions.Commands.AcceptSession
{
    public record AcceptSessionCommand(Guid SessionId, Guid AssistantId) : IRequest<AcceptSessionResponse>;
}
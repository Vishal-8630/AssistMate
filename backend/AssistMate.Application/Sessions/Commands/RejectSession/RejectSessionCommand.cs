using MediatR;

namespace AssistMate.Application.Sessions.Commands.RejectSession
{
    public record RejectSessionCommand(Guid SessionId, Guid AssistantId) : IRequest<RejectSessionResponse>;
}
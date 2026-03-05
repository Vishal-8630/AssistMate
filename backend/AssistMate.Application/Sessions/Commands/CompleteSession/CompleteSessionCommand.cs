using MediatR;

namespace AssistMate.Application.Sessions.Commands.CompleteSession
{
    public record CompleteSessionCommand(Guid SessionId) : IRequest;
}
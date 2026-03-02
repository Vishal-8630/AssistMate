using MediatR;

namespace AssistMate.Application.Sessions.GetSessionMessages
{
    public record GetSessionMessagesQuery(Guid SessionId) : IRequest<List<SessionMessageDto>>;
}
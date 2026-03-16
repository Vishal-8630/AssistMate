using AssistMate.Application.Sessions.DTOs;
using MediatR;

namespace AssistMate.Application.Sessions.GetSessionMessages
{
    public record GetSessionMessagesQuery(Guid SessionId) : IRequest<List<SessionMessageDto>>;
}
using AssistMate.Application.Sessions.DTOs;
using MediatR;

namespace AssistMate.Application.Sessions.GetUnreadCounts
{
    public record GetUnreadCountsQuery(Guid UserId) : IRequest<List<UnreadCountDto>>;
}
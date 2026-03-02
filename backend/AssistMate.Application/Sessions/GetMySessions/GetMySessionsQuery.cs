using AssistMate.Domain.Enums;
using MediatR;

namespace AssistMate.Application.Sessions.GetMySessions
{
    public record GetMySessionQuery(Guid UserId, UserRole Role) : IRequest<List<SessionDto>>;
}
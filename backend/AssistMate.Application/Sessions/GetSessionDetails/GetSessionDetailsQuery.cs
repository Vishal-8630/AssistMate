using MediatR;

namespace AssistMate.Application.Sessions.GetSessionDetails
{
    public record GetSessionDetailsQuery(Guid SessionId) : IRequest<GetSessionDetailsResponse>;
}
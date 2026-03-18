using MediatR;

namespace AssistMate.Application.Sessions.Commands.StartSession
{
    public record StartSessionCommand(Guid SessionId, Guid ClientId, string RazorpayOrderId, string RazorpayPaymentId, string RazorpaySignature) : IRequest<StartSessionResponse>;
}
namespace AssistMate.Application.Sessions.Commands.AcceptSession
{
    public record AcceptSessionResponse(Guid SessionId, string Status, string OrderId, decimal Amount, string Currency);
}
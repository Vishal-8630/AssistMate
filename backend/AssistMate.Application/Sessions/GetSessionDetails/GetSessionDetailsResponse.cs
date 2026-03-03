namespace AssistMate.Application.Sessions.GetSessionDetails
{
    public record GetSessionDetailsResponse(
        Guid Id, 
        Guid ClientId, 
        string ClientName,
        Guid AssistantId, 
        string AssistantName,
        string Status
    );
}
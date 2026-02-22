namespace AssistMate.Application.Auth.Responses
{
    public record RefreshTokenResponse(string AccessToken, string RefreshToken);
}
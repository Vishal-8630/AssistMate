namespace AssistMate.Application.Users.DTOs
{
    public record UpdateProfileResponse(string AccessToken, string RefreshToken, UserDto User);
}
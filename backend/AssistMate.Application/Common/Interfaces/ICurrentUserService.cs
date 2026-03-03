namespace AssistMate.Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        Guid? UserId { get; }
        string? PhoneNumber { get; }
    }
}
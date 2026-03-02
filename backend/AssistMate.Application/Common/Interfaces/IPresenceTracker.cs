namespace AssistMate.Application.Common.Interfaces
{
    public interface IPresenceTracker
    {
        bool UserConnected(Guid userId, string connectionId);
        bool UserDisconnected(Guid userId, string connectionId);
        bool IsOnline(Guid userId);
        List<Guid> GetOnlineUsers();
    }
}
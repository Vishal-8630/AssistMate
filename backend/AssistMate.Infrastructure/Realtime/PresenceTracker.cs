using System;
using System.Collections.Concurrent;
using AssistMate.Application.Common.Interfaces;

namespace AssistMate.Infrastructure.Realtime
{
    public class PresenceTracker : IPresenceTracker
    {
        private static readonly ConcurrentDictionary<Guid, HashSet<string>> _onlineUsers
            = new();

        public bool UserConnected(Guid userId, string connectionId)
        {
            var connections = _onlineUsers.GetOrAdd(userId, _ => new HashSet<string>());

            lock (connections)
            {
                var wasOffline = connections.Count == 0;
                connections.Add(connectionId);
                return wasOffline;
            }
        }

        public bool UserDisconnected(Guid userId, string connectionId)
        {
            if (!_onlineUsers.TryGetValue(userId, out var connections))
                return false;

            lock (connections)
            {
                if (!connections.Remove(connectionId))
                    return false;

                if (connections.Count == 0)
                {
                    _onlineUsers.TryRemove(userId, out _);
                    return true;
                }
            }

            return false;
        }

        public bool IsOnline(Guid userId)
        {
            return _onlineUsers.ContainsKey(userId);
        }

        public List<Guid> GetOnlineUsers()
        {
            return _onlineUsers.Keys.ToList();
        }
    }
}
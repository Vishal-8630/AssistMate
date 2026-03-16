namespace AssistMate.Domain.Entities
{
    public class SessionMessage
    {
        public Guid Id { get; set; }
        public Guid SessionId { get; set; }
        public Guid SenderId { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public Guid? ParentMessageId { get; set; }
        public SessionMessage? ParentMessage { get; set; }

        public DateTime? ReadAt { get; set; }

        public Session Session { get; set; } = null!;
        public User Sender { get; set; } = null!;

        public ICollection<MessageReaction> Reactions { get; set; } = new List<MessageReaction>();
        public ICollection<SessionMessage> Replies { get; set; } = new List<SessionMessage>();
    }
}
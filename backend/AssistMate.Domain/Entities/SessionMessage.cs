namespace AssistMate.Domain.Entities
{
    public class SessionMessage
    {
        public Guid Id { get; set; }
        public Guid SessionId { get; set; }
        public Guid SenderId { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public Session Session { get; set; } = null!;
        public User Sender { get; set; } = null!;
        public DateTime? ReadAt { get; set; } 
    }
}
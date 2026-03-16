namespace AssistMate.Domain.Entities
{
    public class MessageReaction
    {
        public Guid Id { get; set; }
        public Guid MessageId { get; set; }
        public Guid UserId { get; set; }
        public string Emoji { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public SessionMessage Message { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}

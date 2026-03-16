namespace AssistMate.Domain.Entities
{
    public class Review
    {
        public Guid Id { get; set; }
        public Guid SessionId { get; set; }
        public Guid ReviewerId { get; set; }
        public Guid RevieweeId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }

        public Session Session { get; set; } = null!;
        public User Reviewer { get; set; } = null!;
        public User Reviewee { get; set; } = null!;
    }
}
namespace AssistMate.Domain.Entities
{ 
    public class OtpVerification
    {
        public Guid Id { get; set; }

        public string PhoneNumber { get; set; } = null!;
        public string OtpHash { get; set; } = null!;

        public DateTime ExpiresAt { get; set; }
        public bool IsUsed { get; set; } = false;

        public int AttemptCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; }
    }
}
using AssistMate.Domain.Enums;

namespace AssistMate.Domain.Entities
{
    public class Payment
    {
        public Guid Id { get; set; }
        
        public Guid SessionId { get; set; }
        public Session Session { get; set; } = null!;

        public Guid ClientId { get; set; }

        public decimal Amount { get; set; }
        public string Currency { get; set; } = "INR";

        public PaymentStatus Status { get; set; }

        public string? OrderId { get; set; }
        public string? PaymentId { get; set; }
        public string? Signature { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}
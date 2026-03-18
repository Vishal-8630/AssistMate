using AssistMate.Domain.Enums;

namespace AssistMate.Domain.Entities
{
    public class Session
    {
        public Guid Id { get; set; }
        
        public Guid ClientId { get; set; }
        public User Client { get; set; } = null!;

        public Guid AssistantId { get; set; }
        public User Assistant { get; set; } = null!;

        public Guid ServiceId { get; set; }
        public Service Service { get; set; } = null!;

        public SessionStatus Status { get; set; }

        public decimal Amount { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public string? RazorpayOrderId { get; set; }
        public Guid? SuccessfulPaymentId { get; set; }
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();

        public DateTime CreatedAt { get; set; }
        public DateTime? AcceptedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public DateTime? CancelledAt { get; set; }
    }
}
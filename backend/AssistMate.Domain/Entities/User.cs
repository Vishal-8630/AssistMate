using AssistMate.Domain.Enums;

namespace AssistMate.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }

        public string PhoneNumber { get; set; } = null!;

        public UserRole Role { get; set; }

        public bool IsActive { get; set; } = true;

        public bool IsProfileCompleted { get; set; } = false;

        public ICollection<AssistantService> AssistantServices { get; private set; } = new List<AssistantService>();

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
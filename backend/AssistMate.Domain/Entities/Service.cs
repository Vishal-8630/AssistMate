using AssistMate.Domain.Enums;

namespace AssistMate.Domain.Entities
{
    public class Service
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = null!;
        public string? Description { get; private set; }
        public bool IsActive { get; private set; }
        public decimal Price { get; set; }
        public ServiceCategory Category { get; set; }
        public ICollection<AssistantService> AssistantServices { get; private set; } = new List<AssistantService>();
    }
}
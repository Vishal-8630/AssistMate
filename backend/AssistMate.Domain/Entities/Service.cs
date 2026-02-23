namespace AssistMate.Domain.Entities
{
    public class Service
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = null!;
        public string? Description { get; private set; }
        public bool IsActive { get; private set; }
        public ICollection<AssistantService> AssistantServices { get; private set; } = new List<AssistantService>();

        protected Service() { }

        public Service(string name, string? description = null)
        {
            Id = Guid.NewGuid();
            Name = name.Trim();
            Description = description?.Trim();
            IsActive = true;
        }
    }
}
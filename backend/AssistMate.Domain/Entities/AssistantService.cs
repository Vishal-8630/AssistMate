namespace AssistMate.Domain.Entities
{
    public class AssistantService
    {
        public Guid AssistantId { get; private set; }
        public User Assistant { get; private set; } = null!;
        public Guid ServiceId { get; private set; }
        public Service Service { get; private set; } = null!;

        protected AssistantService() { }

        public AssistantService(Guid assistantId, Guid serviceId)
        {
            AssistantId = assistantId;
            ServiceId = serviceId;
        }
    }
}
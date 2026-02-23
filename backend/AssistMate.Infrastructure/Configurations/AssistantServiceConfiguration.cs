using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssistMate.Infrastructure.Configurations
{
    public class AssistantServiceConfiguration : IEntityTypeConfiguration<AssistantService>
    {
        public void Configure(EntityTypeBuilder<AssistantService> builder)
        {
            builder.ToTable("AssistantServices");

            builder.HasKey(x => new { x.AssistantId, x.ServiceId });

            builder.HasOne(x => x.Assistant)
                .WithMany(u => u.AssistantServices)
                .HasForeignKey(x => x.AssistantId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Service)
                .WithMany(s => s.AssistantServices)
                .HasForeignKey(x => x.ServiceId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(x => x.ServiceId);
        }
    }
}
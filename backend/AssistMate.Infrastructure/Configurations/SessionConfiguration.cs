using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssistMate.Infrastructure.Configurations
{
    public class SessionConfiguration : IEntityTypeConfiguration<Session>
    {
        public void Configure(EntityTypeBuilder<Session> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Status)
                .HasConversion<string>()
                .IsRequired();

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.Property(x => x.PaymentStatus)
                .HasConversion<string>()
                .IsRequired();

            builder.Property(x => x.Amount)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.HasOne(x => x.Client)
                .WithMany()
                .HasForeignKey(x => x.ClientId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Assistant)
                .WithMany()
                .HasForeignKey(x => x.AssistantId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Service)
                .WithMany()
                .HasForeignKey(x => x.ServiceId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.Payments)
                .WithOne(p => p.Session)
                .HasForeignKey(p => p.SessionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Payment>()
                .WithMany()
                .HasForeignKey(x => x.SuccessfulPaymentId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasIndex(x => x.Status);
            builder.HasIndex(x => x.PaymentStatus);
            builder.HasIndex(x => x.SuccessfulPaymentId);

            builder.HasIndex(x => new { x.ClientId, x.AssistantId, x.ServiceId })
                .HasFilter("\"Status\" IN ('Requested', 'Active')")
                .IsUnique();
        }
    }
}
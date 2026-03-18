using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssistMate.Infrastructure.Configurations
{
    public class PaymentConfigurations : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.ToTable("Payments");

            builder.HasOne(p => p.Session)
                .WithMany()
                .HasForeignKey(p => p.SessionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(p => p.Amount)
                .HasPrecision(18, 2)
                .IsRequired();

            builder.Property(p => p.Currency)
                .HasMaxLength(10)
                .IsRequired();

            builder.Property(p => p.Status)
                .HasConversion<string>()
                .IsRequired();

            builder.Property(p => p.OrderId)
                .HasMaxLength(100);

            builder.Property(p => p.PaymentId)
                .HasMaxLength(100);

            builder.Property(p => p.Signature)
                .HasMaxLength(255);

            builder.Property(p => p.CreatedAt)
                .IsRequired();

            builder.Property(p => p.CompletedAt);

            builder.HasIndex(p => p.SessionId);
            builder.HasIndex(p => p.ClientId);
            builder.HasIndex(p => p.OrderId);
            builder.HasIndex(p => p.PaymentId);
        }
    }
}
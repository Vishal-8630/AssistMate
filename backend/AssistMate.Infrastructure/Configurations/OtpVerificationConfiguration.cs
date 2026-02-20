using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssistMate.Infrastructure.Configurations
{
    public class OtpVerificationConfiguration: IEntityTypeConfiguration<OtpVerification>
    {
        public void Configure(EntityTypeBuilder<OtpVerification> builder)
        {
            builder.HasKey(o => o.Id);

            builder.Property(o => o.PhoneNumber)
                .IsRequired()
                .HasMaxLength(15);

            builder.Property(o => o.OtpHash)
                .IsRequired();

            builder.HasIndex(o => o.PhoneNumber);

            builder.Property(o => o.ExpiresAt)
                .IsRequired();

            builder.Property(o => o.CreatedAt)
                .IsRequired();
        }
    }
}
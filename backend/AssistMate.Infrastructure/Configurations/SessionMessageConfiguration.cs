using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssistMate.Infrastructure.Configurations
{
    public class SessionMessageConfiguration : IEntityTypeConfiguration<SessionMessage>
    {
        public void Configure(EntityTypeBuilder<SessionMessage> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Content)
                .IsRequired()
                .HasMaxLength(2000);

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.HasOne(x => x.Session)
                .WithMany()
                .HasForeignKey(x => x.SessionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Sender)
                .WithMany()
                .HasForeignKey(x => x.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            // Self-referencing for threaded replies
            builder.HasOne(x => x.ParentMessage)
                .WithMany(m => m.Replies)
                .HasForeignKey(x => x.ParentMessageId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

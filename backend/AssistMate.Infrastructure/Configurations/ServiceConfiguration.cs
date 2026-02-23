using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssistMate.Infrastructure.Configurations
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.ToTable("Services");

            builder.HasKey(s => s.Id);

            builder.Property(s => s.Name)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(s => s.Description)
                .HasMaxLength(500);

            builder.Property(s => s.IsActive)
                .IsRequired();

            builder.HasIndex(s => s.Name)
                .IsUnique();

            // Seed Data (Stable & Deterministic)
            builder.HasData(
                new
                {
                    Id = new Guid("8f4a2c3e-6d91-4f8e-bf2d-2e3d9b1a7c10"),
                    Name = "Tech Support",
                    Description = "Technical help and troubleshooting",
                    IsActive = true
                },
                new
                {
                    Id = new Guid("c2a9d5f1-3b74-4d6f-9e8a-5f3b1c7d9a21"),
                    Name = "Legal Advice",
                    Description = "Basic legal consultation",
                    IsActive = true
                },
                new
                {
                    Id = new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c9d8b32"),
                    Name = "Fitness Coaching",
                    Description = "Personal fitness guidance",
                    IsActive = true
                }
            );
        }
    }
}
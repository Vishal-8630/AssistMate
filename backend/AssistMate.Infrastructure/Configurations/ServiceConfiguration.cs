using AssistMate.Domain.Entities;
using AssistMate.Domain.Enums;
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

            builder.Property(x => x.Price)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(x => x.Category)
                .HasConversion<string>()
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
                    IsActive = true,
                    Price = 199m,
                    Category = ServiceCategory.Tech
                },
                new
                {
                    Id = new Guid("c2a9d5f1-3b74-4d6f-9e8a-5f3b1c7d9a21"),
                    Name = "Legal Advice",
                    Description = "Basic legal consultation",
                    IsActive = true,
                    Price = 499m,
                    Category = ServiceCategory.Business
                },
                new
                {
                    Id = new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c9d8b32"),
                    Name = "Fitness Coaching",
                    Description = "Personal fitness guidance",
                    IsActive = true,
                    Price = 299m,
                    Category = ServiceCategory.Health
                },
                new
                {
                    Id = new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c9e9b32"),
                    Name = "Resume Review",
                    Description = "Professional resume feedback",
                    IsActive = true,
                    Price = 149m,
                    Category = ServiceCategory.Career
                },
                new
                {
                    Id = new Guid("5d7e9a12-4c2f-4b8a-91e6-7f4a3c9d8b32"),
                    Name = "Mock Interview",
                    Description = "Practice interviews with feedback",
                    IsActive = true,
                    Price = 399m,
                    Category = ServiceCategory.Career
                },
                new
                {
                    Id = new Guid("5d9e9a12-4c3f-4b8a-91e6-6f2a3c9d8b32"),
                    Name = "Startup Advice",
                    Description = "Guidance for starting a business",
                    IsActive = true,
                    Price = 599m,
                    Category = ServiceCategory.Business
                },
                new
                {
                    Id = new Guid("3d7e9a12-4c3f-4b8a-91e6-7f2a3c9d1b32"),
                    Name = "Coding Help",
                    Description = "Help with coding problems",
                    IsActive = true,
                    Price = 249m,
                    Category = ServiceCategory.Tech
                },
                new
                {
                    Id = new Guid("7a5e9a12-4c3f-4b8a-91e6-7f2a3c9d8b32"),
                    Name = "Study Guidance",
                    Description = "Help with study planning",
                    IsActive = true,
                    Price = 199m,
                    Category = ServiceCategory.Education
                },
                new
                {
                    Id = new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c8d8b23"),
                    Name = "Personal Finance Help",
                    Description = "Budgeting and saving advice",
                    IsActive = true,
                    Price = 349m,
                    Category = ServiceCategory.Finance
                },
                new
                {
                    Id = new Guid("5d9e7a21-4c3f-4b8a-91e6-7f2a3c9d8b32"),
                    Name = "Life Coaching",
                    Description = "Personal growth and mindset coaching",
                    IsActive = true,
                    Price = 299m,
                    Category = ServiceCategory.Lifestyle
                }
            );
        }
    }
}
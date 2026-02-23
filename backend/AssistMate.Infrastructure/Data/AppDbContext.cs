using Microsoft.EntityFrameworkCore;
using AssistMate.Domain.Entities;
using AssistMate.Application.Common.Interfaces;

namespace AssistMate.Infrastructure.Data
{ 
    public class AppDbContext : DbContext, IAppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Tables
        public DbSet<User> Users => Set<User>();
        public DbSet<OtpVerification> OtpVerifications => Set<OtpVerification>();
        public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
        public DbSet<Service> Services => Set<Service>();
        public DbSet<AssistantService> AssistantService => Set<AssistantService>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
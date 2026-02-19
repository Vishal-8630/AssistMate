using Microsoft.EntityFrameworkCore;
using AssistMate.Domain.Entities;

namespace AssistMate.Infrastructure.Data
{ 
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Tables
        public DbSet<User> Users => Set<User>();
        public DbSet<OtpVerification> OtpVerifications => Set<OtpVerification>();
        public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
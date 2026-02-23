using AssistMate.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Common.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<User> Users { get; }
        DbSet<OtpVerification> OtpVerifications { get; }
        DbSet<RefreshToken> RefreshTokens { get; }
        DbSet<Service> Services { get; }
        DbSet<AssistantService> AssistantServices { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellation = default);
    }
}
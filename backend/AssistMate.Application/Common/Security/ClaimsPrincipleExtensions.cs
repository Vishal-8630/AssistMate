using AssistMate.Application.Common.Exceptions;
using AssistMate.Domain.Enums;
using System.Security.Claims;

namespace AssistMate.Application.Common.Security
{
    public static class ClaimsPrincipleExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            var claim = user.FindFirst(ClaimTypes.NameIdentifier);

            if (claim == null || string.IsNullOrWhiteSpace(claim.Value))
                throw new AppException("Unauthorized", 401);

            if (!Guid.TryParse(claim.Value, out _))
                throw new AppException("Invalid token", 401);

            return Guid.Parse(claim.Value);
        }

        public static UserRole GetUserRole(this ClaimsPrincipal user)
        {
            var claim = user.FindFirst(ClaimTypes.Role);

            if (claim == null || string.IsNullOrWhiteSpace(claim.Value))
                throw new AppException("Unauthorized", 401);

            if (!Enum.TryParse<UserRole>(claim.Value, out _))
                throw new AppException("Invalid role in token", 401);

            return Enum.Parse<UserRole>(claim.Value);
        }
    }
}
using AssistMate.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace AssistMate.Infrastructure.Services
{
    public class CurrentUserServices : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserServices(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid? UserId
        {
            get
            {
                var userId = _httpContextAccessor
                    .HttpContext?
                    .User?
                    .FindFirst(ClaimTypes.NameIdentifier)?
                    .Value;

                return Guid.TryParse(userId, out var parsed) ? parsed : null;
            }
        }

        public string? PhoneNumber =>
            _httpContextAccessor
            .HttpContext?
            .User?
            .FindFirst(ClaimTypes.MobilePhone)?
            .Value;
    }
}
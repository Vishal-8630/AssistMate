using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using AssistMate.Application.Users.DTOs;
using AssistMate.Application.Users.Interfaces;
using AssistMate.Application.Common.Security;
using AssistMate.Application.Common.Exceptions;

namespace AssistMate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                throw new AppException("Unauthorized", 401);

            if (!Guid.TryParse(userId, out _))
                throw new AppException("Unauthorized", 401);

            var parsedId = Guid.Parse(userId);

            var user = await _userService.GetUserByIdAsync(parsedId);

            return Ok(user);
        }

        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(UpdateProfileRequest request)
        {
            Console.WriteLine("Hitting the route");

            var userId = User.GetUserId();

            Console.WriteLine($"User Id: ${userId}");

            var response = await _userService.UpdateProfileAsync(userId, request);

            return Ok(response);
        }
    }
}
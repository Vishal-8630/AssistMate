using Microsoft.AspNetCore.Mvc;
using AssistMate.Application.Services.Interfaces;
using AssistMate.Application.Services.DTOs;
using Microsoft.AspNetCore.Authorization;
using AssistMate.Application.Common.Security;

namespace AssistMate.Api.Controllers
{
    [ApiController]
    [Route("api/services")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public ServicesController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllServices()
        {
            var services = await _serviceManager.GetAllServicesAsync();
            return Ok(services);
        }

        [Authorize(Roles = "Assistant")]
        [HttpGet("me")]
        public async Task<IActionResult> GetMyServices()
        {
            var userId = User.GetUserId();
            var services = await _serviceManager.GetMyServicesAsync(userId);
            return Ok(services);
        }

        [Authorize(Roles = "Assistant")]
        [HttpPut("me")]
        public async Task<IActionResult> UpdateMyServices(UpdateAssistantServicesRequest request, CancellationToken cancellationToken)
        {
            var userId = User.GetUserId();
            await _serviceManager.UpdateAssistantServicesAsync(userId, request, cancellationToken);
            return NoContent();
        }

        [HttpGet("{id:guid}/assistants")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAssistantByService(Guid id)
        {
            var assistants = await _serviceManager.GetAssistantsByServiceAsync(id);

            return Ok(assistants);
        }
    }
}
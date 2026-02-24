using AssistMate.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssistMate.Api.Controllers
{
    [ApiController]
    [Route("api/assistants")]
    public class AssistantsController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public AssistantsController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet("{id:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAssistant(Guid id)
        {
            var assistant = await _serviceManager.GetAssistantByIdAsync(id);

            return Ok(assistant);
        }
    }
}

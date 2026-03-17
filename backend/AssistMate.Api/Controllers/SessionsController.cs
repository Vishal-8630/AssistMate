using AssistMate.Application.Common.Security;
using AssistMate.Application.Sessions.Commands.AcceptSession;
using AssistMate.Application.Sessions.Commands.CompleteSession;
using AssistMate.Application.Sessions.Commands.CreateSession;
using AssistMate.Application.Sessions.Commands.RejectSession;
using AssistMate.Application.Sessions.Commands.StartSession;
using AssistMate.Application.Sessions.DTOs;
using AssistMate.Application.Sessions.GetMySessions;
using AssistMate.Application.Sessions.GetSessionDetails;
using AssistMate.Application.Sessions.GetSessionMessages;
using AssistMate.Application.Sessions.GetUnreadCounts;
using AssistMate.Infrastructure.Realtime;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace AssistMate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SessionsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IHubContext<SessionHub> _hubContext;

        public SessionsController(IMediator mediator, IHubContext<SessionHub> hubContext)
        {
            _mediator = mediator;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] StartSessionCommand command, CancellationToken cancellationToken)
        {
            var clientId = User.GetUserId();
            var result = await _mediator.Send(command with { ClientId = clientId }, cancellationToken);

            return Ok(result);
        }

        [HttpPost("{id}/accept")]
        public async Task<IActionResult> Accept(Guid id, CancellationToken cancellationToken)
        {
            var assistantId = User.GetUserId();
            var command = new AcceptSessionCommand(id, assistantId);
            var result = await _mediator.Send(command, cancellationToken);

            return Ok(result);
        }

        [HttpPost("{id}/reject")]
        public async Task<IActionResult> Reject(Guid id, CancellationToken cancellationToken)
        {
            var assistantId = User.GetUserId();
            var command = new RejectSessionCommand(id, assistantId);
            var result = await _mediator.Send(command, cancellationToken);

            return Ok(result);
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMySessions(CancellationToken cancellationToken)
        {
            var userId = User.GetUserId();
            var role = User.GetUserRole();

            var query = new GetMySessionQuery(userId, role);
            var result = await _mediator.Send(query, cancellationToken);

            return Ok(result);
        }
 
        [Authorize]
        [HttpGet("{sessionId}/messages")]
        public async Task<IActionResult> GetMessages(Guid sessionId, CancellationToken cancellationToken)
        {
            var query = new GetSessionMessagesQuery(sessionId);
            var result = await _mediator.Send(query, cancellationToken);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var query = new GetSessionDetailsQuery(id);
            var result = await _mediator.Send(query, cancellationToken);

            return Ok(result);
        }

        [Authorize]
        [HttpPost("{id:guid}/complete")]
        public async Task<IActionResult> CompleteSession(Guid id, CancellationToken cancellationToken)
        {
            var command = new CompleteSessionCommand(id);
            await _mediator.Send(command, cancellationToken);

            await _hubContext.Clients
                .Group($"session-{id}")
                .SendAsync("SessionCompleted", id);

            return NoContent();
        }

        [Authorize]
        [HttpGet("unread-counts")]
        public async Task<ActionResult<List<UnreadCountDto>>> GetUnreadCounts(CancellationToken cancellationToken)
        {
            var userId = User.GetUserId();
            var query = new GetUnreadCountsQuery(userId);
            var result = await _mediator.Send(query, cancellationToken);

            return Ok(result);
        }
    }
}
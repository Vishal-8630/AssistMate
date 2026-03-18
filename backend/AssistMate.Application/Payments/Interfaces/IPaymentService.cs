using AssistMate.Application.Payments.DTOs;

namespace AssistMate.Application.Payments.Interfaces
{
    public interface IPaymentService
    {
        Task<CreatePaymentResponse> CreatePaymentAsync(Guid sessionId, Guid clientId, decimal amount);
        Task VerifyAndCompletePaymentAsync(Guid sessionId, string orderId, string paymentId, string signature);
    }
}
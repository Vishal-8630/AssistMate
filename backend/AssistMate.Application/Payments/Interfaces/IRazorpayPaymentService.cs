using AssistMate.Application.Payments.DTOs;

namespace AssistMate.Application.Payments.Interfaces
{
    public interface IRazorpayPaymentService
    {
        Task<CreatePaymentOrderResponse> CreateOrderAsync(decimal amount, string currency = "INR");
        Task<bool> VerifyPaymentAsync(string orderId, string paymentId, string signature);
    }
}
namespace AssistMate.Application.Payments.DTOs
{
    public record CreatePaymentResponse(string OrderId, decimal Amount, string Currency);
}
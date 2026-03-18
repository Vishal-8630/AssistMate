namespace AssistMate.Application.Payments.DTOs
{
    public record CreatePaymentOrderResponse(string OrderId, decimal Amount, string Currency);
}
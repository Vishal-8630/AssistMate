using AssistMate.Application.Payments.DTOs;
using AssistMate.Application.Payments.Interfaces;
using DomainPayment = AssistMate.Domain.Entities.Payment;
using Microsoft.Extensions.Options;
using Razorpay.Api;
using System.Security.Cryptography;
using System.Text;
using AssistMate.Domain.Enums;
using AssistMate.Application.Common.Interfaces;

namespace AssistMate.Infrastructure.Payments
{
    public class RazorpayPaymentService : IRazorpayPaymentService
    {
        private readonly RazorpaySettings _settings;
        private readonly IAppDbContext _dbContext;

        public RazorpayPaymentService(IOptions<RazorpaySettings> settings, IAppDbContext dbContext)
        {
            _settings = settings.Value;
            _dbContext = dbContext;
        }

        public Task<CreatePaymentOrderResponse> CreateOrderAsync(decimal amount, string currency)
        {
            var client = new RazorpayClient(_settings.KeyId, _settings.KeySecret);

            var options = new Dictionary<string, object>
            {
                { "amount", (int)(amount * 100) },
                { "currency", currency },
                { "payment_capture", 1 }
            };

            var order = client.Order.Create(options);

            return Task.FromResult(new CreatePaymentOrderResponse(order["id"].ToString(), amount, currency));
        }

        public Task<bool> VerifyPaymentAsync(string orderId, string paymentId, string signature)
        {
            var payload = $"{orderId}|{paymentId}";

            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_settings.KeySecret));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));

            var generatedSignature = BitConverter.ToString(hash)
                .Replace("-", "")
                .ToLower();

            return Task.FromResult(generatedSignature == signature);
        }
    }
}
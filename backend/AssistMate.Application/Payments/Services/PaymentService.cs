using AssistMate.Application.Common.Exceptions;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Application.Payments.DTOs;
using AssistMate.Application.Payments.Interfaces;
using AssistMate.Domain.Entities;
using AssistMate.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace AssistMate.Application.Payments.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IAppDbContext _dbContext;
        private readonly IRazorpayPaymentService _razorpayService;

        public PaymentService(IAppDbContext dbContext, IRazorpayPaymentService razorpayService)
        {
            _dbContext = dbContext;
            _razorpayService = razorpayService;
        }
        public async Task<CreatePaymentResponse> CreatePaymentAsync(Guid sessionId, Guid clientId, decimal amount)
        {
            var order = await _razorpayService.CreateOrderAsync(amount, "INR");

            var payment = new Payment
            {
                Id = Guid.NewGuid(),
                SessionId = sessionId,
                ClientId = clientId,
                Amount = amount,
                Currency = "INR",
                Status = PaymentStatus.Pending,
                OrderId = order.OrderId,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.Payments.Add(payment);
            await _dbContext.SaveChangesAsync();

            return new CreatePaymentResponse(order.OrderId, amount, "INR");
        }

        public async Task VerifyAndCompletePaymentAsync(Guid sessionId, string orderId, string paymentId, string signature)
        {
            var payment = await _dbContext.Payments
                .FirstOrDefaultAsync(p => p.OrderId == orderId && p.SessionId == sessionId);

            if (payment == null)
                throw new AppException("Payment record not found");

            if (payment.SessionId != sessionId)
                throw new AppException("Payment does not belong to this session");

            if (payment.Status == PaymentStatus.Paid)
                throw new AppException("Payment already completed");

            var isValid = await _razorpayService.VerifyPaymentAsync(orderId, paymentId, signature);

            if (!isValid)
                throw new AppException("Invalid payment signature");

            var session = await _dbContext.Sessions
                .FirstOrDefaultAsync(s => s.Id == sessionId);

            if (session == null)
                throw new AppException("Session not found");

            if (payment.Amount != session.Amount)
                throw new AppException("Payment amount mismatch");

            payment.Status = PaymentStatus.Paid;
            payment.PaymentId = paymentId;
            payment.Signature = signature;
            payment.CompletedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
        }
    }
}
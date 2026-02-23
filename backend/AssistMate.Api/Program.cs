using AssistMate.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using FluentValidation.AspNetCore;
using AssistMate.Application.Auth.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AssistMate.Application.Common.Interfaces;
using AssistMate.Infrastructure.Services;
using AssistMate.Application.Auth.Interfaces;
using AssistMate.Application.Auth.Services;
using AssistMate.Api.Middlewares;
using AssistMate.Application.Users.Validators;
using AssistMate.Application.Users.Interfaces;
using AssistMate.Application.Users.Services;
using AssistMate.Application.Services.Interfaces;
using AssistMate.Application.Services.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddValidatorsFromAssemblyContaining<VerifyOtpRequestValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateProfileRequestValidator>();
builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IAppDbContext>(provider =>
    provider.GetRequiredService<AppDbContext>());

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter()
        );
    });

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// 🔐 JWT Configuration
var jwtSettings = builder.Configuration.GetSection("Jwt");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings["Key"]!)
        )
    };
});

builder.Services.AddAuthorization();

builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IServiceManager, ServiceManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Exception Middleware
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("FrontendPolicy");

// 🔐 IMPORTANT ORDER
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

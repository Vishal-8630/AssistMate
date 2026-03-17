using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AssistMate.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddServicePriceAndCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Services",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Services",
                type: "numeric(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c9d8b32"),
                columns: new[] { "Category", "Price" },
                values: new object[] { "Health", 299m });

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("8f4a2c3e-6d91-4f8e-bf2d-2e3d9b1a7c10"),
                columns: new[] { "Category", "Price" },
                values: new object[] { "Tech", 199m });

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("c2a9d5f1-3b74-4d6f-9e8a-5f3b1c7d9a21"),
                columns: new[] { "Category", "Price" },
                values: new object[] { "Business", 499m });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Category", "Description", "IsActive", "Name", "Price" },
                values: new object[,]
                {
                    { new Guid("3d7e9a12-4c3f-4b8a-91e6-7f2a3c9d1b32"), "Tech", "Help with coding problems", true, "Coding Help", 249m },
                    { new Guid("5d7e9a12-4c2f-4b8a-91e6-7f4a3c9d8b32"), "Career", "Practice interviews with feedback", true, "Mock Interview", 399m },
                    { new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c8d8b23"), "Finance", "Budgeting and saving advice", true, "Personal Finance Help", 349m },
                    { new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c9e9b32"), "Career", "Professional resume feedback", true, "Resume Review", 149m },
                    { new Guid("5d9e7a21-4c3f-4b8a-91e6-7f2a3c9d8b32"), "Lifestyle", "Personal growth and mindset coaching", true, "Life Coaching", 299m },
                    { new Guid("5d9e9a12-4c3f-4b8a-91e6-6f2a3c9d8b32"), "Business", "Guidance for starting a business", true, "Startup Advice", 599m },
                    { new Guid("7a5e9a12-4c3f-4b8a-91e6-7f2a3c9d8b32"), "Education", "Help with study planning", true, "Study Guidance", 199m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("3d7e9a12-4c3f-4b8a-91e6-7f2a3c9d1b32"));

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("5d7e9a12-4c2f-4b8a-91e6-7f4a3c9d8b32"));

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c8d8b23"));

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c9e9b32"));

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("5d9e7a21-4c3f-4b8a-91e6-7f2a3c9d8b32"));

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("5d9e9a12-4c3f-4b8a-91e6-6f2a3c9d8b32"));

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("7a5e9a12-4c3f-4b8a-91e6-7f2a3c9d8b32"));

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Services");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AssistMate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddServices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Description", "IsActive", "Name" },
                values: new object[,]
                {
                    { new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c9d8b32"), "Personal fitness guidance", true, "Fitness Coaching" },
                    { new Guid("8f4a2c3e-6d91-4f8e-bf2d-2e3d9b1a7c10"), "Technical help and troubleshooting", true, "Tech Support" },
                    { new Guid("c2a9d5f1-3b74-4d6f-9e8a-5f3b1c7d9a21"), "Basic legal consultation", true, "Legal Advice" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("5d7e9a12-4c3f-4b8a-91e6-7f2a3c9d8b32"));

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("8f4a2c3e-6d91-4f8e-bf2d-2e3d9b1a7c10"));

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: new Guid("c2a9d5f1-3b74-4d6f-9e8a-5f3b1c7d9a21"));
        }
    }
}

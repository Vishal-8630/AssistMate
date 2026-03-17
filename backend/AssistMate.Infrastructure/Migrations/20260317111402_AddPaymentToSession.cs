using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssistMate.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentToSession : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Sessions",
                type: "numeric(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "PaymentStatus",
                table: "Sessions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "PaymentStatus",
                table: "Sessions");
        }
    }
}

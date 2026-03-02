using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssistMate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMessagesRead : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ReadAt",
                table: "SessionMessages",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReadAt",
                table: "SessionMessages");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssistMate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddIsProfileCompleteToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsProfileCompleted",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsProfileCompleted",
                table: "Users");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssistMate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMessageReaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ParentMessageId",
                table: "SessionMessages",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MessageReactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MessageId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Emoji = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageReactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessageReactions_SessionMessages_MessageId",
                        column: x => x.MessageId,
                        principalTable: "SessionMessages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MessageReactions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SessionMessages_ParentMessageId",
                table: "SessionMessages",
                column: "ParentMessageId");

            migrationBuilder.CreateIndex(
                name: "IX_MessageReactions_MessageId",
                table: "MessageReactions",
                column: "MessageId");

            migrationBuilder.CreateIndex(
                name: "IX_MessageReactions_UserId",
                table: "MessageReactions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SessionMessages_SessionMessages_ParentMessageId",
                table: "SessionMessages",
                column: "ParentMessageId",
                principalTable: "SessionMessages",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionMessages_SessionMessages_ParentMessageId",
                table: "SessionMessages");

            migrationBuilder.DropTable(
                name: "MessageReactions");

            migrationBuilder.DropIndex(
                name: "IX_SessionMessages_ParentMessageId",
                table: "SessionMessages");

            migrationBuilder.DropColumn(
                name: "ParentMessageId",
                table: "SessionMessages");
        }
    }
}

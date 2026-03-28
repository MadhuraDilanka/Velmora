using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CounsellingPlatform.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDomainEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProfilePictureUrl",
                table: "CounsellorProfiles",
                newName: "ProfileImageUrl");

            migrationBuilder.RenameColumn(
                name: "ConsultationFee",
                table: "CounsellorProfiles",
                newName: "SessionFee");

            migrationBuilder.AddColumn<bool>(
                name: "IsVerified",
                table: "CounsellorProfiles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ProfessionalTitle",
                table: "CounsellorProfiles",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "ClientProfiles",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfileImageUrl",
                table: "ClientProfiles",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVerified",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "ProfessionalTitle",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "ProfileImageUrl",
                table: "ClientProfiles");

            migrationBuilder.RenameColumn(
                name: "SessionFee",
                table: "CounsellorProfiles",
                newName: "ConsultationFee");

            migrationBuilder.RenameColumn(
                name: "ProfileImageUrl",
                table: "CounsellorProfiles",
                newName: "ProfilePictureUrl");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateOfBirth",
                table: "ClientProfiles",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);
        }
    }
}

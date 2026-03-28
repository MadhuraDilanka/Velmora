using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CounsellingPlatform.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DomainModelEnhancement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HourlyRate",
                table: "CounsellorProfiles",
                newName: "ConsultationFee");

            migrationBuilder.RenameColumn(
                name: "DocumentUrl",
                table: "CounsellorProfiles",
                newName: "UpdatedBy");

            migrationBuilder.RenameColumn(
                name: "ProfilePictureUrl",
                table: "ClientProfiles",
                newName: "UpdatedBy");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "ClientProfiles",
                newName: "CreatedBy");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastLoginAt",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilePictureUrl",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RejectionReason",
                table: "CounsellorProfiles",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovedAt",
                table: "CounsellorProfiles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CertificateUrl",
                table: "CounsellorProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "CounsellorProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAvailableInPerson",
                table: "CounsellorProfiles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsAvailableOnline",
                table: "CounsellorProfiles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Languages",
                table: "CounsellorProfiles",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinkedInUrl",
                table: "CounsellorProfiles",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SessionDurationMinutes",
                table: "CounsellorProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "ClientProfiles",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "ClientProfiles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmergencyContactPhone",
                table: "ClientProfiles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmergencyContactName",
                table: "ClientProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateOfBirth",
                table: "ClientProfiles",
                type: "date",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressLine1",
                table: "ClientProfiles",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressLine2",
                table: "ClientProfiles",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "ClientProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "ClientProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContactRelationship",
                table: "ClientProfiles",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nationality",
                table: "ClientProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Occupation",
                table: "ClientProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "ClientProfiles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreferredLanguage",
                table: "ClientProfiles",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "ClientProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastLoginAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ProfilePictureUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ApprovedAt",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "CertificateUrl",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "IsAvailableInPerson",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "IsAvailableOnline",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "Languages",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "LinkedInUrl",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "SessionDurationMinutes",
                table: "CounsellorProfiles");

            migrationBuilder.DropColumn(
                name: "AddressLine1",
                table: "ClientProfiles");

            migrationBuilder.DropColumn(
                name: "AddressLine2",
                table: "ClientProfiles");

            migrationBuilder.DropColumn(
                name: "City",
                table: "ClientProfiles");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "ClientProfiles");

            migrationBuilder.DropColumn(
                name: "EmergencyContactRelationship",
                table: "ClientProfiles");

            migrationBuilder.DropColumn(
                name: "Nationality",
                table: "ClientProfiles");

            migrationBuilder.DropColumn(
                name: "Occupation",
                table: "ClientProfiles");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "ClientProfiles");

            migrationBuilder.DropColumn(
                name: "PreferredLanguage",
                table: "ClientProfiles");

            migrationBuilder.DropColumn(
                name: "State",
                table: "ClientProfiles");

            migrationBuilder.RenameColumn(
                name: "UpdatedBy",
                table: "CounsellorProfiles",
                newName: "DocumentUrl");

            migrationBuilder.RenameColumn(
                name: "ConsultationFee",
                table: "CounsellorProfiles",
                newName: "HourlyRate");

            migrationBuilder.RenameColumn(
                name: "UpdatedBy",
                table: "ClientProfiles",
                newName: "ProfilePictureUrl");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "ClientProfiles",
                newName: "Address");

            migrationBuilder.AlterColumn<string>(
                name: "RejectionReason",
                table: "CounsellorProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "ClientProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "ClientProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmergencyContactPhone",
                table: "ClientProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmergencyContactName",
                table: "ClientProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DateOfBirth",
                table: "ClientProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);
        }
    }
}

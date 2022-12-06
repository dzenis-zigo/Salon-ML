using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalonML_API.Migrations
{
    public partial class AddLocalizationToImageCaption : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageCaption",
                table: "DynamicContents",
                newName: "ImageCaptionEnglish");

            migrationBuilder.RenameColumn(
                name: "EnglishLocalization",
                table: "DynamicContents",
                newName: "TextEnglish");

            migrationBuilder.RenameColumn(
                name: "BosnianLocalization",
                table: "DynamicContents",
                newName: "TextBosnian");

            migrationBuilder.AddColumn<string>(
                name: "ImageCaptionBosnian",
                table: "DynamicContents",
                type: "varchar(100)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageCaptionBosnian",
                table: "DynamicContents");

            migrationBuilder.RenameColumn(
                name: "TextEnglish",
                table: "DynamicContents",
                newName: "EnglishLocalization");

            migrationBuilder.RenameColumn(
                name: "TextBosnian",
                table: "DynamicContents",
                newName: "BosnianLocalization");

            migrationBuilder.RenameColumn(
                name: "ImageCaptionEnglish",
                table: "DynamicContents",
                newName: "ImageCaption");
        }
    }
}

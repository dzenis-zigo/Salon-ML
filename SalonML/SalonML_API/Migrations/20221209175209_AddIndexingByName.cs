using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalonML_API.Migrations
{
    public partial class AddIndexingByName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_DynamicContents_Name",
                table: "DynamicContents",
                column: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DynamicContents_Name",
                table: "DynamicContents");
        }
    }
}

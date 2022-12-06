using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalonML_API.Migrations
{
    public partial class CreateDynamicContentModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DynamicContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    EnglishLocalization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BosnianLocalization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageCaption = table.Column<string>(type: "varchar(100)", nullable: false),
                    ImageUrl = table.Column<string>(type: "varchar(254)", nullable: false),
                    ImageData = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    IconValue = table.Column<string>(type: "varchar(100)", nullable: false),
                    OrderIndex = table.Column<int>(type: "int", nullable: false),
                    ModifiedBy = table.Column<string>(type: "varchar(100)", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DynamicContents", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DynamicContents");
        }
    }
}

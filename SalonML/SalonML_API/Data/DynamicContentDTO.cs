using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SalonML_API.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SalonML_API.Data
{
    public class DynamicContentDTO
    {
        [JsonConstructor]
        public DynamicContentDTO() { }

        public DynamicContentDTO(DynamicContent d)
        {
            Id = d.Id;
            Name = d.Name;
            TextEnglish = d.TextEnglish;
            TextBosnian = d.TextBosnian;
            ImageCaptionEnglish = d.ImageCaptionEnglish;
            ImageCaptionBosnian = d.ImageCaptionBosnian;
            ImageUrl = d.ImageUrl;
            ImageData = d.ImageData;
            IconValue = d.IconValue;
            OrderIndex = d.OrderIndex;
        }

        [Required(ErrorMessage = "Id is required.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        public string? TextEnglish { get; set; }

        public string? TextBosnian { get; set; }

        public string? ImageCaptionEnglish { get; set; }

        public string? ImageCaptionBosnian { get; set; }

        public string? ImageUrl { get; set; }

        public byte[]? ImageData { get; set; }

        public string? IconValue { get; set; }

        public int? OrderIndex { get; set; }
    }
}

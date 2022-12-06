using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SalonML_API.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalonML_API.Data
{
    public class DynamicContentDTO
    {
        public DynamicContentDTO(DynamicContent d)
        {
            Name = d.Name;
            EnglishLocalization = d.EnglishLocalization;
            BosnianLocalization = d.BosnianLocalization;
            ImageCaption = d.ImageCaption;
            ImageUrl = d.ImageUrl;
            ImageData = d.ImageData;
            IconValue = d.IconValue;
            OrderIndex = d.OrderIndex;
        }

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        public string? EnglishLocalization { get; set; }

        public string? BosnianLocalization { get; set; }

        public string? ImageCaption { get; set; }

        public string? ImageUrl { get; set; }

        public byte[]? ImageData { get; set; }

        public string? IconValue { get; set; }

        public int? OrderIndex { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace SalonML_API.Data
{
    public class DynamicContentDTO
    {
        [Required(ErrorMessage = "Id is required.")]
        public string Id { get; set; } = null!;

        [Required(ErrorMessage = "Type is required.")]
        public string Type { get; set; } = null!;

        [Required(ErrorMessage = "English localization is required.")]
        public string EnglishLocalization { get; set; } = null!;

        [Required(ErrorMessage = "Bosnian localization is required.")]
        public string BosnianLocalization { get; set; } = null!;
    }
}

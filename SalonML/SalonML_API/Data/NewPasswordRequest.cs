using System.ComponentModel.DataAnnotations;

namespace SalonML_API.Data
{
    public class NewPasswordRequest
    {
        [Required(ErrorMessage = "UserId is required.")]
        public string UserId { get; set; } = null!;

        [Required(ErrorMessage = "Token is required.")]
        public string Token { get; set; } = null!;

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = null!;
    }
}

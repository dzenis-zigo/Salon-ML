using System.ComponentModel.DataAnnotations;

namespace SalonML_API.Data
{
    // TODO suffix all these with DTO?
    public class NewPasswordRequest
    {
        [Required(ErrorMessage = "Token is required.")]
        public string Token { get; set; } = null!;

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = null!;
    }
}

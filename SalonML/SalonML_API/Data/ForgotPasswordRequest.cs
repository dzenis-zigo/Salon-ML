using System.ComponentModel.DataAnnotations;

namespace SalonML_API.Data
{
    public class ForgotPasswordRequest
    {
        [Required(ErrorMessage = "Email is required.")]
        //TODO remove the "= null!" ?
        public string Email { get; set; } = null!;
    }
}

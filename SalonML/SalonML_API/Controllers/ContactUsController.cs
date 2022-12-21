using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SalonML_API.Data.Models;
using SalonML_API.Data;
using SalonML_API.Services;

namespace SalonML_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly EmailHandler _emailHandler;

        public ContactUsController(EmailHandler emailHandler)
        {
            _emailHandler = emailHandler;
        }

        [HttpPost]
        public async Task<IActionResult> SendEmail(ContactUsRequest contactUsRequest)
        {
            _emailHandler.SendContactUsEmail(contactUsRequest.Name, contactUsRequest.Email, contactUsRequest.Message);

            return Ok();
        }
    }
}

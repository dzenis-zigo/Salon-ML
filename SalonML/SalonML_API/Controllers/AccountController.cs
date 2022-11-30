using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SalonML_API.Data;
using SalonML_API.Data.Models;
using System.Net;

namespace SalonML_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        //private readonly JwtHandler _jwtHandler;

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            return Ok();
        }
    }
}

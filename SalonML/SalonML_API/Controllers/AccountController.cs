using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SalonML_API.Data;
using SalonML_API.Data.Models;
using SalonML_API.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SalonML_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly EmailHandler _emailHandler;
        private readonly IConfiguration _config;

        public AccountController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            EmailHandler emailHandler,
            IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _emailHandler = emailHandler;
            _config = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            // verify email & password
            var user = await _userManager.FindByNameAsync(loginRequest.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginRequest.Password))
                return Unauthorized(new LoginResult()
                {
                    Success = false
                });

            // create and return a token
            var jwt = await GenerateTokenAsync(user);

            return Ok(new LoginResult()
            {
                Success = true,
                Token = jwt
            });
        }

        [HttpPost]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest forgotPasswordRequest)
        {
            // check if this email is signed up
            // request duration can be used in timing based attack. TODO possibly add delay here 
            var user = await _userManager.FindByNameAsync(forgotPasswordRequest.Email);
            if (user == null)
                return Ok(); // don't return more info in order to prevent email enumeration

            // TODO change expiration time
            var token = await _userManager.GeneratePasswordResetTokenAsync(user); // token is crazy long

            // fire and forget to lower server response time (and prevent timing attacks)
            _emailHandler.SendPasswordResetLink(forgotPasswordRequest.Email, user.Id, token);

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> NewPassword(NewPasswordRequest newPasswordRequest)
        {
            var user = await _userManager.FindByIdAsync(newPasswordRequest.UserId);

            var result = await _userManager.ResetPasswordAsync(user, 
                newPasswordRequest.Token, 
                newPasswordRequest.Password);

            return Ok();
        }

        private async Task<string> GenerateTokenAsync(ApplicationUser user)
        {
            var jwtOptions = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: await GetClaimsAsync(user),
                expires: DateTime.Now.AddHours(
                    Convert.ToInt16(_config["JwtSettings:ExpirationTimeInHours"])),
                signingCredentials: GetSigningCredentials()
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(jwtOptions);

            return jwt;
        }

        private async Task<List<Claim>> GetClaimsAsync(ApplicationUser user)
        {
            var claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.Email, user.Email));

            foreach (var role in await _userManager.GetRolesAsync(user))
                claims.Add(new Claim(ClaimTypes.Role, role));

            return claims;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _config["JwtSettings:SecurityKey"]));

            return new SigningCredentials(
                key, 
                SecurityAlgorithms.HmacSha256);
        }
    }
}

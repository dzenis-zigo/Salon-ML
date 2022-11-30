using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SalonML_API.Data;
using SalonML_API.Data.Models;

namespace SalonML_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public SeedController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> ImportLoremIpsum()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public async Task<IActionResult> CreateDefaultUsers()
        {
            // create the Administrator role
            string role_Administrator = "Administrator";

            if (await _roleManager.FindByNameAsync(role_Administrator) == null)
                await _roleManager.CreateAsync(new IdentityRole(role_Administrator));

            // create list to return newly added users
            var addedUserList = new List<ApplicationUser>();

            foreach (string email in _configuration.GetSection("DefaultUsers:DefaultEmails").Get<string[]>())
            {
                if (await _userManager.FindByNameAsync(email) == null)
                {
                    var newUser = new ApplicationUser()
                    {
                        SecurityStamp = Guid.NewGuid().ToString(),
                        UserName = email,
                        Email = email
                    };

                    await _userManager.CreateAsync(newUser, _configuration["DefaultUsers:DefaultPassword"]);

                    await _userManager.AddToRoleAsync(newUser, role_Administrator);

                    newUser.EmailConfirmed = true;
                    newUser.LockoutEnabled = false;

                    addedUserList.Add(newUser);
                }
            }

            if (addedUserList.Count > 0)
                await _context.SaveChangesAsync();

            return new JsonResult(new
            {
                Count = addedUserList.Count,
                Users = addedUserList
            });
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonML_API.Data;
using SalonML_API.Data.Models;
using System.Security.Claims;

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
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> ImportLoremIpsum()
        {
            const string LoremIpsumShortText = "Lorem {Ipsum}";
            const string LoremIpsumLongText = "There are many variations of passages of Lorem Ipsum is " +
                    "at the available, but the majority have {suffered} alteration some form, " +
                    "by injected humour randomised words at the available.";

            // todo possibly export this to a service
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()!.Value;

            // create a lookup dictionary 
            // containing all the countries already existing 
            var dynamicContentDictionary = _context.DynamicContents
                .AsNoTracking()
                .ToDictionary(x => x.Name, StringComparer.OrdinalIgnoreCase);

            // create list to return which Dynamic Content was added
            var newlyAddedDynamicContent = new List<DynamicContent>();

            // create seed data list
            var defaultDynamicContent = new List<DynamicContent>();

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-header-title",
                EnglishLocalization = LoremIpsumShortText + " (English)",
                BosnianLocalization = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-header-description",
                EnglishLocalization = LoremIpsumLongText + " (English)",
                BosnianLocalization = LoremIpsumLongText + " (Bosnian)"
            });

            foreach (var seed in defaultDynamicContent)
            {
                if (!dynamicContentDictionary.ContainsKey(seed.Name))
                {
                    seed.ModifiedBy = email;
                    seed.ModifiedOn = DateTime.Now;

                    await _context.DynamicContents.AddAsync(seed);
                    newlyAddedDynamicContent.Add(seed);
                }
            }

            await _context.SaveChangesAsync();

            return Ok(newlyAddedDynamicContent);
        }

        [HttpGet]
        public async Task<IActionResult> CreateDefaultUsers()
        {
            // create the Administrator role
            string role_Administrator = "Administrator";

            if (await _roleManager.FindByNameAsync(role_Administrator) == null)
                await _roleManager.CreateAsync(new IdentityRole(role_Administrator));

            // access Admin emails one by one because couldn't store array of secrets in Azure Key Vault
            IEnumerable<string> emails = new List<string>() {
                _configuration["DefaultUsers:DefaultEmailOne"],
                _configuration["DefaultUsers:DefaultEmailTwo"],
                _configuration["DefaultUsers:DefaultEmailThree"],
            };

            // create list to return newly added users
            var addedUserList = new List<ApplicationUser>();

            foreach (string email in emails)
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

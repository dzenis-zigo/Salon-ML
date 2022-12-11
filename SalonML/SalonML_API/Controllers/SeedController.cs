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
                .ToLookup(x => x.Name, StringComparer.OrdinalIgnoreCase);

            // create list to return which Dynamic Content was added
            var newlyAddedDynamicContent = new List<DynamicContent>();

            // create seed data list
            var defaultDynamicContent = new List<DynamicContent>();

            /*                 Navbar                */
            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "navbar-logo",
                ImageCaptionEnglish = LoremIpsumShortText + " (English)",
                ImageCaptionBosnian = LoremIpsumShortText + " (Bosnian)",
                ImageUrl = "https://www.facebook.com/salonML/",
                ImageData = null
            });

            /*              Resume Header            */
            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-header-title",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-header-description",
                TextEnglish = LoremIpsumLongText + " (English)",
                TextBosnian = LoremIpsumLongText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-header-image",
                ImageCaptionEnglish = LoremIpsumShortText + " (English)",
                ImageCaptionBosnian = LoremIpsumShortText + " (Bosnian)",
                ImageUrl = "https://www.facebook.com/salonML/",
                ImageData = null
            });

            /*              Social Media                 */
            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "social-media-subtitle",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "social-media-title",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "social-media-description",
                TextEnglish = LoremIpsumLongText + " (English)",
                TextBosnian = LoremIpsumLongText + " (Bosnian)"
            });

            /*              Resume Info Cards            */

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-info-cards-subtitle",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-info-cards-title",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-info-cards-description",
                TextEnglish = LoremIpsumLongText + " (English)",
                TextBosnian = LoremIpsumLongText + " (Bosnian)"
            });

            for (int i = 0; i < 3; i++)
            {
                defaultDynamicContent.Add(new DynamicContent()
                {
                    Name = "resume-info-cards-icon-array",
                    IconValue = "lni-apartment",
                    OrderIndex = i
                });

                defaultDynamicContent.Add(new DynamicContent()
                {
                    Name = "resume-info-cards-header-array",
                    TextEnglish = LoremIpsumShortText + " (English)",
                    TextBosnian = LoremIpsumShortText + " (Bosnian)",
                    OrderIndex = i
                });

                defaultDynamicContent.Add(new DynamicContent()
                {
                    Name = "resume-info-cards-body-array",
                    TextEnglish = LoremIpsumLongText + " (English)",
                    TextBosnian = LoremIpsumLongText + " (Bosnian)",
                    OrderIndex = i
                });
            }

            /*              Cp Gallery                   */
            for (int i = 0; i < 2; i++)
            {
                defaultDynamicContent.Add(new DynamicContent()
                {
                    Name = "cp-gallery-image-array",
                    ImageCaptionEnglish = LoremIpsumShortText + " (English)",
                    ImageCaptionBosnian = LoremIpsumShortText + " (Bosnian)",
                    ImageUrl = "https://www.facebook.com/salonML/",
                    ImageData = null,
                    OrderIndex = i
                });
            }

                /*              Resume Contact Us            */
                defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-contact-us-title",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-contact-us-subtitle",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-contact-us-name-placeholder",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-contact-us-email-placeholder",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-contact-us-message-placeholder",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-contact-us-submit-button",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            for (int i = 0; i < 3; i++)
            {
                defaultDynamicContent.Add(new DynamicContent()
                {
                    Name = "resume-contact-us-info-box-header-array",
                    TextEnglish = LoremIpsumShortText + " (English)",
                    TextBosnian = LoremIpsumShortText + " (Bosnian)",
                    OrderIndex = i
                });
            }

            for (int i = 0; i < 3; i++)
            {
                defaultDynamicContent.Add(new DynamicContent()
                {
                    Name = "resume-contact-us-info-box-icon-array",
                    IconValue = "lni-apartment",
                    OrderIndex = i
                });
            }

            for (int i = 0; i < 3; i++)
            {
                defaultDynamicContent.Add(new DynamicContent()
                {
                    Name = "resume-contact-us-info-box-value-array",
                    TextEnglish = LoremIpsumShortText + " (English)",
                    TextBosnian = LoremIpsumShortText + " (Bosnian)",
                    OrderIndex = i
                });
            }

            defaultDynamicContent.Add(new DynamicContent()
            {
                Name = "resume-contact-us-working-hours-header",
                TextEnglish = LoremIpsumShortText + " (English)",
                TextBosnian = LoremIpsumShortText + " (Bosnian)"
            });

            for (int i = 0; i < 7; i++)
            {
                defaultDynamicContent.Add(new DynamicContent()
                {
                    Name = "resume-contact-us-working-hours-left-column-array",
                    TextEnglish = "Monday (English)",
                    TextBosnian = "Monday (Bosnian)",
                    OrderIndex = i
                });
            }

            for (int i = 0; i < 7; i++)
            {
                defaultDynamicContent.Add(new DynamicContent()
                {
                    Name = "resume-contact-us-working-hours-right-column-array",
                    TextEnglish = "9:00-18:00 (English)",
                    TextBosnian = "9:00-18:00 (Bosnian)",
                    OrderIndex = i
                });
            }

            foreach (var seed in defaultDynamicContent)
            {
                // could be a problem if adding more indexes to existing "array"
                if (!dynamicContentDictionary.Contains(seed.Name))
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
                if (email == null)
                    continue;

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

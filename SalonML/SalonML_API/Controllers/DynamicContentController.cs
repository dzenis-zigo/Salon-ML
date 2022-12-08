using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonML_API.Data;
using SalonML_API.Data.Models;
using System.Reflection;
using System.Security.Claims;

namespace SalonML_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DynamicContentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DynamicContentController(
            ApplicationDbContext context)
        {
            _context = context;
        }

        // perform an update on a single dynamicContent item
        [HttpPut]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateItem(DynamicContentDTO dto)
        {
            // todo possibly export this to a service
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()!.Value;

            DynamicContent dbModel = new DynamicContent()
            {
                Id = dto.Id,
                Name = dto.Name,
                TextEnglish = dto.TextEnglish,
                TextBosnian = dto.TextBosnian,
                ImageCaptionEnglish = dto.ImageCaptionEnglish,
                ImageCaptionBosnian = dto.ImageCaptionBosnian,
                ImageUrl = dto.ImageUrl,
                ImageData = dto.ImageData,
                IconValue = dto.IconValue,
                OrderIndex = dto.OrderIndex,
                ModifiedBy = email,
                ModifiedOn = DateTime.Now
            };

            _context.Entry(dbModel).State = EntityState.Modified;

            // ignore an update on properties with null values
            foreach (PropertyInfo propertyInfo in dbModel.GetType().GetProperties())
            {
                if (propertyInfo.GetValue(dbModel) == null)
                    _context.Entry(dbModel).Property(propertyInfo.Name).IsModified = false;
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        // return a list of every DynamicContent
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            // todo verify this is the correct way to cast to DTO
            var dynContentList = _context.DynamicContents
                .Select(d => new DynamicContentDTO(d))
                //.OrderByDescending(x => x.OrderIndex)
                .ToLookup(x => x.Name, StringComparer.OrdinalIgnoreCase);

            return Ok(dynContentList);
        }
    }
}

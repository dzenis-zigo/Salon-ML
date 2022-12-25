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

            UpdateRelevantModelProperties(dto, null, email);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateArray(DynamicContentDTO[] dtoArray)
        {
            // todo possibly export this to a service
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()!.Value;

            for (int i = 0; i < dtoArray.Length; i++)
            {
                UpdateRelevantModelProperties(dtoArray[i], i, email);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        private void UpdateRelevantModelProperties(DynamicContentDTO dto, int? arrayIndex, string email)
        {
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
                OrderIndex = arrayIndex,
                ModifiedBy = email,
                ModifiedOn = DateTime.Now,
            };

            _context.Entry(dbModel).State = EntityState.Modified;

            // ignore an update on properties with null values
            foreach (PropertyInfo propertyInfo in dbModel.GetType().GetProperties())
            {
                if (propertyInfo.GetValue(dbModel) == null)
                    _context.Entry(dbModel).Property(propertyInfo.Name).IsModified = false;
            }
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> CreateItem(string name, bool hasShortText, bool hasLongText, bool hasCaption)
        {
            //todo maybe move this since it's duplicate with seed controller
            const string LoremIpsumShortText = "Lorem {Ipsum}";
            const string LoremIpsumLongText = "There are many variations of passages of Lorem Ipsum is " +
                    "at the available, but the majority have {suffered} alteration some form, " +
                    "by injected humour randomised words at the available.";

            string? caption = hasCaption ? LoremIpsumShortText : null;

            string? text = null;
            if (hasShortText)
                text = LoremIpsumShortText;
            else if (hasLongText)
                text = LoremIpsumLongText;

            var itemWithHighestOrderIndex = _context.DynamicContents.Where(d => d.Name == name).OrderByDescending(x => x.OrderIndex).FirstOrDefault();
            var newOrderIndex = (itemWithHighestOrderIndex == null) ? 0 : itemWithHighestOrderIndex.OrderIndex + 1;

            // todo possibly export this to a service
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()!.Value;

            DynamicContent dbModel = new DynamicContent()
            {
                Name = name,
                TextEnglish = text == null ? null : text + " (English)",
                TextBosnian = text == null ? null : text + " (Bosnian)",
                ImageCaptionEnglish = caption == null ? null : caption + " (English)",
                ImageCaptionBosnian = caption == null ? null : caption + " (Bosnian)",
                OrderIndex = newOrderIndex,
                ModifiedBy = email,
                ModifiedOn = DateTime.Now
            };

            _context.DynamicContents.Add(dbModel);
            await _context.SaveChangesAsync();

            return Ok(new DynamicContentDTO(dbModel));
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var dbModel = new DynamicContent()
            {
                Id = id
            };
            _context.Remove(dbModel);

            await _context.SaveChangesAsync();

            return Ok();
        }

        // return a list of every DynamicContent
        [HttpGet]
        public async Task<IActionResult> GetContent(bool? getBeginningContent = false)
        {
            List<DynamicContentDTO> dynContentList;

            if (getBeginningContent == false)
                dynContentList = await _context.DynamicContents
                    .OrderBy(x => x.OrderIndex)
                    .Select(d => new DynamicContentDTO(d))
                    .Where(i => !i.Name.Contains("resume-header") &&
                                !i.Name.Contains("navbar") &&
                                !i.Name.Contains("social-media") &&
                                !i.Name.Contains("resume-info-cards"))
                    .ToListAsync();
            else
                dynContentList = await _context.DynamicContents
                    .OrderBy(x => x.OrderIndex)
                    //.Where(i => strArray.Any(i.Name.Contains))
                    //.Where(i => strArray.Any(s => i.Name.Contains(s)))
                    //.Where(c => EF.Functions.Like(c.Name, "resume-header%"))
                    .Where(i => i.Name.Contains("resume-header") ||
                                i.Name.Contains("navbar") ||
                                i.Name.Contains("social-media") ||
                                i.Name.Contains("resume-info-cards"))
                    .Select(d => new DynamicContentDTO(d))
                    .ToListAsync();

            return Ok(dynContentList);
        }
    }
}

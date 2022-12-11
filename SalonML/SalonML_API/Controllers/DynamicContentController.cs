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
        public async Task<IActionResult> CreateItem(string name)
        {
            var itemWithHighestOrderIndex = _context.DynamicContents.Where(d => d.Name == name).OrderByDescending(x => x.OrderIndex).FirstOrDefault();
            var newOrderIndex = (itemWithHighestOrderIndex != null) ? itemWithHighestOrderIndex.OrderIndex + 1 : null;

            // todo possibly export this to a service
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()!.Value;

            DynamicContent dbModel = new DynamicContent()
            {
                Name = name,
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
        public async Task<IActionResult> GetList()
        {
            // todo get this to order by OrderIndex
            var dynContentList = _context.DynamicContents
                .OrderByDescending(x => x.OrderIndex)
                .Select(d => new DynamicContentDTO(d))
                .ToLookup(x => x.Name);

            return Ok(dynContentList);
        }
    }
}

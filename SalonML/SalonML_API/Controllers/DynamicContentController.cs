using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonML_API.Data;

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

        // get all of type
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            //var dtoList = new List<DynamicContentDTO>();

            // todo verify this is the correct way to cast to DTO
            var dynContentList = await _context.DynamicContents
                .Select(d => new DynamicContentDTO(d))
                .ToListAsync();
            /*
            dtoList.Add(new DynamicContentDTO() 
            {
                Id = "resume-header-title",
                EnglishLocalization = "Lorem {Ipsum} English",
                BosnianLocalization = "Lorem {Ipsum} Bosnian"
            }); 
            dtoList.Add(new DynamicContentDTO()
            {
                Id = "resume-header-description",
                EnglishLocalization = "There are many variations of passages of Lorem Ipsum is " +
                "at the available, but the majority have {suffered} alteration some form, " +
                "by injected humour randomised words at the available. English",
                BosnianLocalization = "There are many variations of passages of Lorem Ipsum is " +
                "at the available, but the majority have {suffered} alteration some form, " +
                "by injected humour randomised words at the available. Bosnian"
            });
            */

            return Ok(dynContentList);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateDynamicContent(DynamicContentDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}

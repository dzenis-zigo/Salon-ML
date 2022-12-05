using Microsoft.AspNetCore.Mvc;
using SalonML_API.Data;

namespace SalonML_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DynamicContentController : ControllerBase
    {
        // get all of type
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var dtoList = new List<DynamicContentDTO>();

            dtoList.Add(new DynamicContentDTO() 
            {
                Id = "resume-header-title",
                Type = "resume-header",
                EnglishLocalization = "Lorem {Ipsum} English",
                BosnianLocalization = "Lorem {Ipsum} Bosnian"
            }); 
            dtoList.Add(new DynamicContentDTO()
            {
                Id = "resume-header-description",
                Type = "resume-header",
                EnglishLocalization = "There are many variations of passages of Lorem Ipsum is " +
                "at the available, but the majority have {suffered} alteration some form, " +
                "by injected humour randomised words at the available. English",
                BosnianLocalization = "There are many variations of passages of Lorem Ipsum is " +
                "at the available, but the majority have {suffered} alteration some form, " +
                "by injected humour randomised words at the available. Bosnian"
            });

            return Ok(dtoList);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateDynamicContent(DynamicContentDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}

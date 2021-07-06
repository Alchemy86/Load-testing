using Microsoft.AspNetCore.Mvc;

namespace LoadTesting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestingController : ControllerBase
    {
        // GET
        public IActionResult Index()
        {
            return Ok("Bom");
        }
    }
}
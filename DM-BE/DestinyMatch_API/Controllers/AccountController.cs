using BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FPTIU_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public async Task<IActionResult> getallAcount()
        {
            var result = await _accountService.getListAccount();
            return Ok(result);
        }

        [HttpGet("hello")]
        public async Task<IActionResult> hello()
        {
            return Ok("Hello");
        }
    }
}

using FPTIU_DataAccess.Services.Interfaces;
using FPTIU_Domain.DTOs;
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
        public async Task<IActionResult> Get()
        {
            var list = await _accountService.getListAccount();
            if(list == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,"not any account");
            }
            return Ok(list);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AccountDTO request)
        {
            var result = await _accountService.Login(request);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AccountDTO request)
        {
            await _accountService.Register(request);
            
            return Ok("Register account success");
        }

    }
}

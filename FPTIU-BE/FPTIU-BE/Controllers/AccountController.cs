using FPTIU_DataAccess.Services.Interfaces;
using FPTIU_Domain.DTOs.Request;
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

            var JWT = await _accountService.GenerateJSONWebTokenAsync(result);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }
            return Ok(JWT);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AccountDTO request)
        {
            await _accountService.Register(request);
            
            return Ok("Register account success");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] Guid accountid)
        {
            await _accountService.Delete(accountid);
            return Ok("Delete account success");
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using KanbanTesting.Services;
using KanbanTesting.Models;

namespace KanbanTesting.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class LoginController : ControllerBase
  {
    private readonly ILoginService _loginService;

    public LoginController(ILoginService loginService)
    {
      _loginService = loginService;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody]LoginModel model)
    {
      try
      {
        if (model == null)
        {
          return BadRequest("Invalid request body");
        }

        var result = await _loginService.LoginAsync(model);

        if (result.Success)
        {
          return Ok(result);
        }
        else
        {
          return Unauthorized(result.Message);
        }
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex.Message}");
      }
    }
  }
}
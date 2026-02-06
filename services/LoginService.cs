using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Services
{
  public class LoginService
  {
    private readonly ILogger<LoginService> _logger;

    public LoginService(ILogger<LoginService> logger)
    {
      _logger = logger;
    }

    public async Task<bool> LoginAsync(string username, string password)
    {
      try
      {
        // Assuming a userRepository to fetch users
        // Replace with actual userRepository
        // var userRepository = new UserRepository();
        // var user = await userRepository.GetUserAsync(username);

        // For demonstration purposes, assume user exists
        // if (user == null)
        // {
        //     _logger.LogWarning("User not found for username: {username)", username);
        //     return false;
        // }

        // Hash the provided password and compare with stored hash
        var passwordHash = HashPassword(password);
        // Replace with actual stored hash for the user
        // var storedHash = user.PasswordHash;

        // For demonstration purposes, assume direct comparison
        // if (passwordHash != storedHash)
        // {
        //     _logger.LogWarning("Password mismatch for username: {username)", username);
        //     return false;
        // }

        // Successful login
        _logger.LogInformation("Login successful for username: {username)", username);
        return true;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error during login for username: {username)", username);
        return false;
      }
    }

    private string HashPassword(string password)
    {
      // Use SHA256 for hashing
      using var sha256 = SHA256.Create();
      var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password);

      var builder = new StringBuilder();
      foreach (var b in bytes)
      {
        builder.Append(b.ToString("x2");
      }
      return builder.ToString();
    }
  }
}
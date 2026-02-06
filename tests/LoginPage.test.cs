using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;

namespace KanbanTesting.Tests
{
  [TestFixture]
  public class LoginPageTests
  {
    private IWebDriver driver;

    [SetUp]
    public void SetUp()
    {
      driver = new ChromeDriver();
      driver.Manage().Window.Maximize();
      driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    }

    [TearDown]
    public void TearDown()
    {
      driver.Quit();
    }

    [Test]
    public void Test_LoginPage_LoadsSuccessfully()
    {
      // Arrange
      string baseUrl = "https://example.com/login"; // Replace with actual base URL

      // Act
      driver.Navigate().GoToUrl(baseUrl);

      // Assert
      Assert.IsTrue(driver.Title.Contains("Login Page")); // Replace with actual page title
    }

    [Test]
    public void Test_LoginPage_ValidCredentials_LoginSuccessful()
    {
      // Arrange
      string baseUrl = "https://example.com/login"; // Replace with actual base URL
      string username = "testuser"; // Replace with actual test username
      string password = "testpassword"; // Replace with actual test password

      // Act
      driver.Navigate().GoToUrl(baseUrl);
      driver.FindElement(By.Name("username")).SendKeys(username);
      driver.FindElement(By.Name("password")).SendKeys(password);
      driver.FindElement(By.Name("login")).Click();

      // Assert
      Assert.IsTrue(driver.Url.Contains("dashboard")); // Replace with actual URL after successful login
    }

    [Test]
    public void Test_LoginPage_InvalidCredentials_LoginFailed()
    {
      // Arrange
      string baseUrl = "https://example.com/login"; // Replace with actual base URL
      string username = "testuser"; // Replace with actual test username
      string password = "wrongpassword"; // Replace with actual wrong test password

      // Act
      driver.Navigate().GoToUrl(baseUrl);
      driver.FindElement(By.Name("username")).SendKeys(username);
      driver.FindElement(By.Name("password")).SendKeys(password);
      driver.FindElement(By.Name("login")).Click();

      // Assert
      Assert.IsTrue(driver.FindElement(By.ClassName("error-message")).Text.Contains("Invalid credentials")); // Replace with actual error message
    }

    [Test]
    public void Test_LoginPage_EmptyUsername_LoginFailed()
    {
      // Arrange
      string baseUrl = "https://example.com/login"; // Replace with actual base URL
      string password = "testpassword"; // Replace with actual test password

      // Act
      driver.Navigate().GoToUrl(baseUrl);
      driver.FindElement(By.Name("password")).SendKeys(password);
      driver.FindElement(By.Name("login")).Click();

      // Assert
      Assert.IsTrue(driver.FindElement(By.ClassName("error-message")).Text.Contains("Username is required")); // Replace with actual error message
    }

    [Test]
    public void Test_LoginPage_EmptyPassword_LoginFailed()
    {
      // Arrange
      string baseUrl = "https://example.com/login"; // Replace with actual base URL
      string username = "testuser"; // Replace with actual test username

      // Act
      driver.Navigate().GoToUrl(baseUrl);
      driver.FindElement(By.Name("username")).SendKeys(username);
      driver.FindElement(By.Name("login")).Click();

      // Assert
      Assert.IsTrue(driver.FindElement(By.ClassName("error-message")).Text.Contains("Password is required")); // Replace with actual error message
    }
  }
}
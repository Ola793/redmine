require('dotenv').config();
import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";
import { LostPasswordPage } from "./pages/lost-password.page";

test.describe.skip("Sign in check", async () => {
  let homePage;
  let loginPage;
  let lostPasswordPage;

  const login = process.env.LOGIN;
  const password = process.env.PASSWORD;
  const email = process.env.EMAIL;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    lostPasswordPage = new LostPasswordPage(page);

    await homePage.goto();
    await expect(homePage.title).toHaveText("Redmine");
      
    await expect(homePage.signInLink).toBeVisible();
    await homePage.signInLink.click();
  });

  test("should log in and log out", async () => {
    await test.step("should log in", async () => {
      await expect(loginPage.loginLabel).toBeVisible();
      await expect(loginPage.loginLabel).toHaveText("Login");
  
      await expect(loginPage.loginInput).toBeVisible();
      await loginPage.loginInput.fill(login);
        
      await expect(loginPage.passwordLabel).toBeVisible();
      await expect(loginPage.passwordLabel).toHaveText(/^\s*Password/);
  
      await expect(loginPage.passwordInput).toBeVisible();
      await loginPage.passwordInput.fill(password);
  
      await expect(loginPage.stayLoggedIn).toBeVisible();
      await loginPage.stayLoggedIn.click();
  
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.loginButton).toBeEditable();
      await expect(loginPage.loginButton).toHaveAttribute("value", "Login");
      await loginPage.loginButton.click();
  
      await expect(homePage.loginAs).toBeVisible();
      await expect(homePage.loginAs).toHaveText(`Logged in as ${login}`);
    });

    await test.step("should log out", async () => {
      await expect(homePage.signOutLink).toBeVisible();
      await homePage.signOutLink.click();

      await expect(homePage.signInLink).toBeVisible();
    });
  });

  test("should reset password", async () => {
    await expect(loginPage.loginLabel).toBeVisible();
    await expect(loginPage.loginLabel).toHaveText("Login");
  
    await expect(loginPage.loginInput).toBeVisible();
        
    await expect(loginPage.passwordLabel).toBeVisible();
    await expect(loginPage.lostPassword).toHaveText("Lost password");
    await loginPage.lostPassword.click();

    await expect(lostPasswordPage.title).toBeVisible();
    await expect(lostPasswordPage.title).toHaveText("Lost password");

    await expect(lostPasswordPage.emailLabel).toBeVisible();
    await expect(lostPasswordPage.emailLabel).toHaveText("Email *");

    await expect(lostPasswordPage.emailInput).toBeVisible();
    await lostPasswordPage.emailInput.fill(email);

    await expect(lostPasswordPage.submitButton).toBeVisible();
    await expect(lostPasswordPage.submitButton).toBeEnabled();
    await lostPasswordPage.submitButton.click();

    await expect(loginPage.resetPasswordMessage).toBeVisible();
    await expect(loginPage.resetPasswordMessage).toHaveText("An email with instructions to choose a new password has been sent to you.");
  });
});
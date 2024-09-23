require('dotenv').config();
import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";
import { LostPasswordPage } from "./pages/lost-password.page";

test.describe("Reset password check", async () => {
  let homePage;
  let loginPage;
  let lostPasswordPage;

  const email = process.env.EMAIL;

  test("should reset password", async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    lostPasswordPage = new LostPasswordPage(page);

    await homePage.goto();
    await expect(homePage.title).toHaveText("Redmine");
      
    await expect(homePage.signInLink).toBeVisible();
    await homePage.signInLink.click();

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
require('dotenv').config();
import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";

test.describe("Sign out check", async () => {
  let homePage;
  let loginPage;

  const login = process.env.LOGIN;
  const password = process.env.PASSWORD;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.goto();
    await expect(homePage.title).toHaveText("Redmine");
      
    await expect(homePage.signInLink).toBeVisible();
    await homePage.signInLink.click();

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
  });

  test("should log out", async () => {
    await test.step("should log out", async () => {
      await expect(homePage.signOutLink).toBeVisible();
      await homePage.signOutLink.click();

      await expect(homePage.signInLink).toBeVisible();
    });
  });
});
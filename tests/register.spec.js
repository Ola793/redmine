require('dotenv').config();
import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";
import { RegisterPage } from "./pages/register.page";
import randomizer from "./helpers/randomizer.js";

test.describe.only("Register check", async () => {
  let homePage;
  let loginPage;
  let registerPage;

  const login = randomizer.randomLogin();
  const password = randomizer.randomPassword();
  const email = randomizer.randomEmail();
  const firstName = randomizer.randomName();
  const lastName = randomizer.randomLastName();

  test("should register", async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);

    await homePage.goto();
    await expect(homePage.title).toHaveText("Redmine");
      
    await expect(homePage.registerLink).toBeVisible();
    await homePage.registerLink.click();

    await expect(registerPage.title).toBeVisible();
    await expect(registerPage.title).toHaveText("Register");

    await expect(registerPage.loginLabel).toBeVisible();
    await expect(registerPage.loginLabel).toHaveText("Login *");
    await expect(registerPage.loginInput).toBeVisible();
    await registerPage.loginInput.fill(login);

    await expect(registerPage.passwordLabel).toBeVisible();
    await expect(registerPage.passwordLabel).toHaveText("Password *");
    await expect(registerPage.passwordInput).toBeVisible();
    await registerPage.passwordInput.fill(password);

    await expect(registerPage.passwordConfirmationLabel).toBeVisible();
    await expect(registerPage.passwordConfirmationLabel).toHaveText("Confirmation *");
    await expect(registerPage.passwordConfirmationInput).toBeVisible();
    await registerPage.passwordConfirmationInput.fill(password);

    await expect(registerPage.firstNameLabel).toBeVisible();
    await expect(registerPage.firstNameLabel).toHaveText("First name *");
    await expect(registerPage.firstNameInput).toBeVisible();
    await registerPage.firstNameInput.fill(firstName);

    await expect(registerPage.lastNameLabel).toBeVisible();
    await expect(registerPage.lastNameLabel).toHaveText("Last name *");
    await expect(registerPage.lastNameInput).toBeVisible();
    await registerPage.lastNameInput.fill(lastName);

    await expect(registerPage.emailLabel).toBeVisible();
    await expect(registerPage.emailLabel).toHaveText("Email *");
    await expect(registerPage.emailInput).toBeVisible();
    await registerPage.emailInput.fill(email);

    await expect(registerPage.hideEmailLabel).toBeVisible();
    await expect(registerPage.hideEmailLabel).toHaveText("Hide my email address");
    await expect(registerPage.hideEmailInput).toBeVisible();
    await registerPage.hideEmailInput.click();

    await expect(registerPage.languageLabel).toBeVisible();
    await expect(registerPage.languageLabel).toHaveText("Language");
    await expect(registerPage.language).toBeVisible();
    await registerPage.language.selectOption("uk");

    await expect(registerPage.submitButton).toBeVisible();
    await expect(registerPage.submitButton).toBeEnabled();
    await registerPage.submitButton.click();

    await expect(loginPage.flashNotice).toBeVisible();
    await expect(loginPage.flashNotice)
          .toHaveText(`Account was successfully created. An email containing the instructions to activate your account was sent to ${email}.`);
    
    await page.waitForTimeout(10000);
  });
});
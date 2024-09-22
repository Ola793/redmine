export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.title = page.locator("h2").nth(0);

    this.loginLabel = page.locator("label[for='user_login']");
    this.loginInput = page.locator("#user_login");

    this.passwordLabel = page.locator("label[for='user_password']");
    this.passwordInput = page.locator("#user_password");

    this.passwordConfirmationLabel = page.locator("label[for='user_password_confirmation']");
    this.passwordConfirmationInput = page.locator("#user_password_confirmation");

    this.firstNameLabel = page.locator("label[for='user_firstname']");
    this.firstNameInput = page.locator("#user_firstname");

    this.lastNameLabel = page.locator("label[for='user_lastname']");
    this.lastNameInput = page.locator("#user_lastname");

    this.emailLabel = page.locator("label[for='user_mail']");
    this.emailInput = page.locator("#user_mail");

    this.hideEmailLabel = page.locator("label[for='pref_hide_mail']");
    this.hideEmailInput = page.locator("#pref_hide_mail");

    this.languageLabel = page.locator("label[for='user_language']");
    this.language = page.locator("#user_language");

    this.submitButton = page.locator("input[type='submit']");
  }
}
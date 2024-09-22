export class LostPasswordPage {
  constructor(page) {
    this.page = page;

    this.title = page.locator("h2").nth(0);

    this.emailLabel = page.locator("label[for='mail']");
    this.emailInput = page.locator("#mail");

    this.submitButton = page.locator("input[type='submit']");
  }
}
export class LoginPage {
  constructor(page) {
    this.page = page;
    
    this.loginLabel = page.locator("label[for='username']");
    this.loginInput = page.locator("#username");

    this.passwordLabel = page.locator("label[for='password']");
    this.lostPassword = page.locator("a[href='/account/lost_password']");
    this.passwordInput = page.locator("#password");

    this.stayLoggedIn = page.locator("#autologin");

    this.loginButton = page.locator("#login-submit");

    this.resetPasswordMessage = page.locator("#flash_notice");

    this.flashNotice = page.locator("#flash_notice");
  }
}
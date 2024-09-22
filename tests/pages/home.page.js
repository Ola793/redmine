export class HomePage {
  constructor(page) {
    this.page = page;

    this.title = page.locator("h1").nth(0);

    this.signInLink = page.locator("a[href='/login']");

    this.loginAs = page.locator("#loggedas");

    this.signOutLink = page.locator("a[href='/logout']");
    
    this.registerLink = page.locator("a[href='/account/register']");
  }
    
  async goto() {
    await this.page.goto("https://www.redmine.org/");
  }
}
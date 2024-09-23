export class SearchPage {
  constructor(page) {
    this.page = page;

    this.title = page.locator("h2").nth(0);

    this.searchInput = page.locator("#search-input");
  }
}
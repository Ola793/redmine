require('dotenv').config();
import { test, expect } from "@playwright/test";

import randomizer from "./helpers/randomizer.js";

import { HomePage } from "./pages/home.page";
import { SearchPage } from "./pages/search.page";

test.describe("Search check", async () => {
  let homePage;
  let searchPage;
  let word = randomizer.randomWord();

  test("should check search results", async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);

    await homePage.goto();
    await expect(homePage.title).toHaveText("Redmine");

    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.searchInput).toBeEnabled();
    await homePage.searchInput.click();
    await homePage.searchInput.type(word);
    await homePage.searchInput.press("Enter");

    await expect(searchPage.title).toBeVisible();
    await expect(searchPage.title).toHaveText("Search");

    await expect(searchPage.searchInput).toBeVisible();
    await expect(searchPage.searchInput).toHaveValue(word);
  });
});
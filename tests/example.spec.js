// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/html');

  //* Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AnimeRanked/);
});

test('stylesheets are correctly linked to html', async ({page}) => {
  await page.goto('http://localhost:3000/html')

  //* Expect the link to contain correct address
  const stylesheetLink = page.locator('link[rel=stylesheet]');
  await expect(stylesheetLink).toHaveAttribute('href', '/styles/main.css')
})
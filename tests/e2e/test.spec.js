// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/html');

  //* Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AnimeRanked/);
});

test('stylesheets are correctly linked to html', async ({page}) => {
  await page.goto('http://localhost:3000/html');

  //* Expect the link to contain correct address
  const stylesheetLink = page.locator('link[rel=stylesheet]');
  await expect(stylesheetLink).toHaveAttribute('href', '/styles/main.css');
})

//! Outdated tests no longer work

/*
test('Grid box should be visible', async ({ page }) => {
  await page.goto('http://localhost:3000/html');
  //* Expect to gridBox to be visible
  const gridBox = page.locator('blog-entry')
  await expect(gridBox).toBeVisible();
})

test('GridBox content should be Lorem Ipsum', async ({ page }) => {
  await page.goto('http://localhost:3000/html')

  //* Expect the description to be a short excerpt from Lorem Ipsum
  const pageDesc = page.locator('div .blog-content')
  await expect(pageDesc).toHaveText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
})
*/
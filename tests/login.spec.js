// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const testData = require('../testData/testData');

test('login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(testData.urls.loginPage);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page.locator('div[class="title-block"]')).toHaveText('Welcome to Allivet!');
});

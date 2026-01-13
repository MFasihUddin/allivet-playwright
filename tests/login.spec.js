const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
import { config } from "dotenv";
import { resolve } from "path";
//resolved path to env
config({ path: resolve(__dirname, '../secrets/.env') });

test('login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visitSite();
    await loginPage.gotoSignInPage();
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
    await expect(page.locator('div[class="title-block"]')).toHaveText('Welcome to Allivet!');
});
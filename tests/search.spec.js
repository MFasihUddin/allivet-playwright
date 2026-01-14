const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { MyPetsPage } = require('../pages/MyPetsPage');
const { MyVetClinic } = require('../pages/MyVetClinic');
const { config } = require('dotenv');
const { resolve } = require('path')

config({ path: resolve(__dirname, "../secrets/.env") });

test("Verify user can place Rx order", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const myPetsPage = new MyPetsPage(page);
    const myVetClinic = new MyVetClinic(page);

    await loginPage.visitSite();
    await loginPage.gotoSignInPage();
    await loginPage.login(process.env.Email, process.env.Password);
})
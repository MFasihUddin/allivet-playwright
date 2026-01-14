const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { MyPetsPage } = require('../pages/MyPetsPage');
const { pet } = require('../testData/jsonData');
const { config } = require('dotenv');
const { resolve } = require('path');

//resolved path to env
config({ path: resolve(__dirname, '../secrets/.env') });

test.describe("My Pets Page", () => {

    test.beforeEach("Verify user is login", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitSite();
        await loginPage.gotoSignInPage();
        await loginPage.login(process.env.Email, process.env.Password);
    });

    test.skip("Verify that user can add a pet", async ({ page }) => {
        const petsPage = new MyPetsPage(page);
        await petsPage.gotoMyPetsPage();
        await petsPage.addAPet({ pet });
        await expect(page.locator('h6.pet-name')).toHaveText('Jerry');
    })

    test("Verify that the user can upload a pet image", async ({ page }) => {
        const petsPage = new MyPetsPage(page);
        await petsPage.gotoMyPetsPage();
        await petsPage.uploadPetImage('testData/assets/jerry.png');
        const petImage = page.locator("div[class='pet-info-wrap'] img[alt='Cat']");
        await expect(petImage).toBeVisible();
    })

    test.skip("Verify user can remove a Pet", async ({ page }) => {
        const petsPage = new MyPetsPage(page);
        await petsPage.gotoMyPetsPage();
        await petsPage.removeAPet();
        await expect(page.locator('h6.pet-name', { hasText: 'Jerry' })).toHaveCount(0);
    });

});
3
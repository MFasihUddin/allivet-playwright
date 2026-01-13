const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login");
const { MyVetClinic } = require("../pages/MyVetClinic");
const { config } = require("dotenv");
const { resolve } = require("path");

config({ path: resolve(__dirname, "../secrets/.env") });

test.describe("My Vets Page", () => {

    test.beforeEach("user can login", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitSite();
        await loginPage.gotoSignInPage();
        await loginPage.login(process.env.Email, process.env.Password);
    })

    test("Verify that user can add a vet", async ({ page }) => {
        const myVetClinic = new MyVetClinic(page);
        await myVetClinic.gotoMyVetClinicPage();
        await myVetClinic.addANewVetClinic();
        await expect(page.locator("div[class='vet-name'] h6")).toHaveCount(1);
    });

    test.skip("Verify that user can remove a vet", async ({ page }) => {
        const myVetClinic = new MyVetClinic(page);
        await myVetClinic.gotoMyVetClinicPage();
        await myVetClinic.removeAVet();
        await expect(page.locator("div[class='vet-name'] h6")).toHaveCount(0);
    });

    test.skip("Verify that user can add a vet by Phone Number", async ({ page }) => {
        const myVetClinic = new MyVetClinic(page);
        await myVetClinic.gotoMyVetClinicPage();
        await myVetClinic.addAVetByPhoneNumber();
        await expect(page.locator("div[class='vet-name'] h6")).toHaveCount(1);
    })

});
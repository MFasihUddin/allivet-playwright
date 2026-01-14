const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login");
const { MyPetsPage } = require("../pages/MyPetsPage");
const { MyVetClinic } = require("../pages/MyVetClinic");
const { Search } = require("../pages/Search");
const { ProductDetailsPage } = require("../pages/ProductDetailsPage");
const { pet, shippingAddress } = require("../testData/jsonData");
const { Checkout } = require("../pages/Checkout");
const { config } = require("dotenv");
const { resolve } = require("path");

config({ path: resolve(__dirname, "../secrets/.env") });

test("Verify user can place Rx order", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const myPetsPage = new MyPetsPage(page);
    const myVetClinic = new MyVetClinic(page);
    const search = new Search(page);
    const pdp = new ProductDetailsPage(page);
    const checkout = new Checkout(page);

    await loginPage.visitSite();
    await loginPage.gotoSignInPage();
    await loginPage.login(process.env.Email, process.env.Password);

    await myPetsPage.gotoMyPetsPage();
    await page.waitForTimeout(2000);
    await myPetsPage.ensurePetExists({ pet });

    await myVetClinic.gotoMyVetClinicPage();
    await page.waitForTimeout(2000);
    await myVetClinic.ensureVetExists();

    await search.searchAProduct();
    await pdp.addtoCartAndCheckout();
    
    await checkout.ensureAddress({ shippingAddress });
    await checkout.selectShippingMethod();
    await checkout.ensurePayemntStep(
        process.env.CC_NUMBER,
        process.env.CC_EXP_MONTH,
        process.env.CC_EXP_YEAR,
        process.env.CC_CVV
    );
    await page.waitForTimeout(1000);
    await checkout.goToPetAndVetStep();
    await checkout.continueToLastStep();
    await checkout.createOrder();

    await expect(page.locator("h2.order-thank-you-msg")).toHaveText(
        "Thank you for your order!",
        { timeout: 10000 }
    );
});

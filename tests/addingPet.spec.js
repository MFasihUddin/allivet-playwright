const {test, expect} = require('@playwright/test');
const {LoginPage} =  require('../pages/login');
const {MyPets} = require('../pages/pet');
const testData = require('../testData/testData');
const pet = require('../testData/jsonData');

test("Adding a Pet",async ({page})=>{
    const loginPage = new LoginPage(page);
    const petsPage = new MyPets(page);
    await page.goto(testData.urls.loginPage);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await page.click(testData.goto.myPets);
    await petsPage.addingAPet(pet);
    await expect(page.locator('h6.pet-name')).toHaveText('Jerry');
});
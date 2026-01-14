class MyPetsPage {
    constructor(page) {
        this.page = page;
        //navigation locator
        this.myPetsPage = page.locator('(//a[@class="menuitem"])[6]');
        this.petCount = page.locator('.pet-item');
        //adding a pet related locator
        this.addAPetButton = page.locator(
            ".show-pet-modal-btn.show-pet-modal-btn-account"
        );
        this.petName = page.locator("#name");
        this.petType = page.locator("#pet-type");
        this.petBreed = page.locator("#select2-dog-breed-container");
        this.petGender = page.locator("#pet-gender-select");
        this.petWeight = page.locator("#weight");
        this.petBirthday = page.locator("#birthday");
        this.createButton = page.getByRole("button", {
            name: "Create",
            exact: true,
        });
        this.savePetInfo = page.locator('.btn-save.primary-btn.js-button-save');
        this.clickOnRemove = page.locator(
            '(//button[@aria-label="label.deletepet"])[1]'
        );
        this.clickOnDelete = page.locator(
            '(//button[@class="primary-btn delete-confirmation-btn"])'
        );
        this.clickonEdit = page.locator(
            '(//button[@aria-label="Edit Pet Profile"])[1]'
        );
        this.petImageUploadInput = page.locator('#load-img-pet-');
    }

    async gotoMyPetsPage() {
        await this.myPetsPage.click();
    }

    async getPetsCount() {
        return await this.petCount.count();
    }
    async addAPet({ pet }) {
        await this.addAPetButton.click();
        await this.petName.fill(pet.name);
        await this.petType.selectOption(pet.petType);
        await this.petBreed.click();
        await this.page.keyboard.type(pet.petBreed);
        await this.page.keyboard.press("Enter");
        await this.petGender.selectOption(pet.petGender);
        await this.petWeight.fill(pet.petWeight);
        await this.petBirthday.fill(pet.petBirthday);
        await this.createButton.click();
    }

    async ensurePetExists({ pet }) {
        const count = await this.getPetsCount();
        if (count === 0) {
            await this.addAPet({ pet });
        }
    }

    async uploadPetImage(pet_image){
        await this.clickonEdit.click();
        await this.petImageUploadInput.setInputFiles(pet_image);
        await this.savePetInfo.click();
    }

    async removeAPet() {
        await this.clickOnRemove.click();
        await this.clickOnDelete.click();
    }
}

module.exports = { MyPetsPage };

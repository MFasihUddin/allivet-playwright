class MyVetClinic {
    constructor(page) {
        this.page = page;
        // go to My Vet Clinic Page locator
        this.myVetClinic = page.locator('(//a[@class="menuitem"])[8]');
        this.vetCount = page.locator('.item-vets.vet-clinic-item');
        // adding Vet Clinic Locator
        this.addNewVetClinic = page.locator(
            'button[class="show-vet-modal-btn btn-light add-vet"]'
        );
        this.vetClinicName = page.locator("id=name");
        this.zipCode = page.locator("id=zipCode");
        this.searchVetClinic = page.locator(
            'button[class="btn btn-save btn-block primary-btn"]'
        );
        this.selectVetClinic = page.locator(
            '(//a[@class="primary-btn select-vet"])[1]'
        );
        this.removeBtn = page.locator('button[class="btn remove-vet"]');
        this.deleteCofirm = page.locator('button[class="primary-btn delete-confirmation-btn ts-style"]');
        this.selectPhoneNumber = page.locator("label[for='vet-phone'] span[class='dot']");
        this.phoneNumber = page.locator("id=phone");

    }
    //End of Constructor

    async gotoMyVetClinicPage() {
        await this.myVetClinic.click();
    }

    async getVetsCount() {
        return await this.vetCount.count();
    }
    async addANewVetClinic() {
        await this.addNewVetClinic.click();
        await this.vetClinicName.fill("My Vet Clinic 1");
        await this.zipCode.fill("12345");
        await this.searchVetClinic.click();
        await this.selectVetClinic.click();
    }
    async ensureVetExists() {
        const vetCount = await this.getVetsCount();
        if (vetCount === 0) {
            await this.addANewVetClinic();
        }
    }

    async addAVetByPhoneNumber() {
        this.selectPhoneNumber.click();
        this.phoneNumber.fill("1234567891");
        this.searchVetClinic.click();
        this.selectVetClinic.click();
    }

    async removeAVet() {
        await this.removeBtn.click();
        await this.deleteCofirm.click();
    }
}

module.exports = { MyVetClinic };

class Checkout {
    constructor(page) {
        this.page = page;
        //Shipping Address
        this.address = page.locator('#shippingAddressOnedefault');
        this.saveAddressPopup = page.getByRole('button', { name: 'Save Address' });
        this.phoneNumber = page.locator("#shippingPhoneNumberdefault");
        this.state = page.locator('#shippingStatedefault');
        this.city = page.locator('#shippingAddressCitydefault');
        this.zipCode = page.locator('#shippingZipCodedefault');
        this.continueToShippingOptions = page.locator('//button[normalize-space()="Continue to Shipping Options"]');
        this.suggestedAddress = page.locator('(//div[@class="pcaitem pcafirstitem pcalastitem pcaselected"])[2]');
        //OPTIONAL POPUP
        this.recomended_popup = page.locator('button[class="btn primary-btn ml-auto d-block btn-save-address"]');

        //Shipping Method
        this.shippingMethod = page.locator('(//input[@class="form-check-input invisible-radio"])[1]');
        this.continueToPaymentMethod = page.locator('//button[normalize-space()="Continue to Payment Method"]');
        this.checkShippingAddress = page.locator('(//span[@class="ship-to-address1"])[1]');
        //Payment Method
        this.creditCardNumber = page.locator('#cardNumber');
        this.expirationMonth = page.locator('#expirationMonth');
        this.expirationYear = page.locator('#expirationYear');
        this.cvv = page.locator('#securityCode');
        this.saveAndContinue = page.locator('(//button[normalize-space()="Save and Continue"])[1]');
        this.checkCreditCard = page.locator("div[class='saved-credit-card-type'] span");
        //Pet & Vet Clinic Information
        this.saveAndContinueToLaststep = page.locator('(//button[normalize-space()="Save and Continue"])[2]');
        //Review & Submit Order
        this.placeOrder = page.locator('//button[normalize-space()="Place Order"]');

    }
    //End of Constructor

    async isShippingAddressFound() {
        const addressText = await this.checkShippingAddress.textContent();
        return addressText?.trim();
    }

    async ensureAddress({ shippingAddress }) {
        const addressfound = await this.isShippingAddressFound();
        if (!addressfound) {
            await this.addShippingAddress({ shippingAddress });
        } else {
            const buttonVisible = await this.continueToShippingOptions.isVisible();
            if (buttonVisible) {
                await this.continueToShippingOptions.click();
            } else {
                console.log("Button not visible");
            }
        }
    }
    async addShippingAddress({ shippingAddress }) {
        await this.phoneNumber.click();
        await this.phoneNumber.fill(shippingAddress.phonenumber);
        await this.address.click();
        await this.address.type(shippingAddress.address, { delay: 10 });
        await this.page.waitForTimeout(1000);
        await this.address.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.continueToShippingOptions.click();
    }

    async selectShippingMethod() {
        await this.continueToPaymentMethod.click();
    }

    async ensurePayemntStep(cardNumber, expMonth, expYear, cvv) {
        const hasSavedCard = await this.checkCreditCard.isVisible().catch(() => false);
        if (!hasSavedCard) {
            const hasValue = await this.creditCardNumber.evaluate(el => el.value.trim().length > 0);
            console.log("cardNo " + hasValue);
            if (!hasValue) {
                console.log("add payment");
                await this.addPaymentInfo(cardNumber, expMonth, expYear, cvv);
            } else {
                console.log("Credit Card :" + hasValue);
                await this.goToPetAndVetStep();
            }
        }
    }

    async addPaymentInfo(cardNumber, expMonth, expYear, cvv) {
        await this.creditCardNumber.click();
        await this.creditCardNumber.fill(cardNumber);
        await this.expirationMonth.click();
        await this.expirationMonth.selectOption(expMonth);
        await this.expirationYear.click();
        await this.expirationYear.selectOption(expYear);
        await this.cvv.click();
        await this.cvv.fill(cvv);
    }

    async goToPetAndVetStep() {
        await this.saveAndContinue.click();
    }
    async continueToLastStep() {
        await this.saveAndContinueToLaststep.click();
    }
    async createOrder() {
        await this.placeOrder.click();
    }
}

module.exports = { Checkout };
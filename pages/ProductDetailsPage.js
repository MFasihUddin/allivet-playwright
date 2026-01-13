class ProductDetailsPage {
    constructor(page) {
        this.page = page;
        // One time purchase on PDP locator
        // this.OneTimePurchase = page.locator('button[class="add-to-cart btn btn-primary"]');
        this.autoshipFrequency = page.locator('#autoship-defaultfrequency');
        this.addToCart = page.locator('[title="add to cart"]');
        this.checkout = page.locator('(//a[@class="btn-primary primary-btn checkout-btn "])[2]');
    }
    //End of Constructor

    async addtoCartAndCheckout() {
        await this.autoshipFrequency.selectOption({ label: 'Every 2 weeks' });
        await this.addToCart.click();
        await this.checkout.click();
    }
}

module.exports = { ProductDetailsPage };
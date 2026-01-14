class ProductDetailsPage {
    constructor(page) {
        this.page = page;
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
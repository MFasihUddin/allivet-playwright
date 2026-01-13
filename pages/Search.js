class Search {
    constructor(page) {
        this.page = page;
        // search locator
        this.search = page.locator("#search-results");
        this.suggestedItem = page.locator('//a[@class="suggestions-link"]');
    }
    //End of Constructor
    async searchAProduct() {
        await this.search.click();
        await this.search.fill("15049-11");
        await this.suggestedItem.click();
    }
}

module.exports = { Search };

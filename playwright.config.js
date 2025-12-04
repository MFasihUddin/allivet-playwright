// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    use: {
        headless: false, // run tests in visible browser
        baseURL: 'https://sfcc.petfoodking.com',
        httpCredentials: {
            username: 'storefront',
            password: 'KATUjwEny4Nya29u'
        },
        // viewport: { width: 1280, height: 720 }
    },
    testDir: './tests',
});

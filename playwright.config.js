// playwright.config.js
const { defineConfig } = require('@playwright/test');
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, './secrets/.env') });

module.exports = defineConfig({
    timeout: 120000,
    use: {
        headless: true,
        baseURL: "https://sfcc.petfoodking.com",
        httpCredentials: {
            username: process.env.STORE_USERNAME,
            password: process.env.STORE_PASSWORD
        },
    },
    testDir: './tests',
});
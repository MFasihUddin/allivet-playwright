// pages/login.js
class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator("input[id='login-form-email']");  // Update selectors as per your app
        this.passwordInput = page.locator("input[id='login-form-password']");
        // this.loginButton = page.locator("(//button[normalize-space()='Login'])[1]");
        this.loginButton = page.getByRole('button', { name: 'Login' });

    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };

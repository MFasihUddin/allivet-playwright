class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator("input[id='login-form-email']"); 
        this.passwordInput = page.locator("input[id='login-form-password']");
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
module.exports = { LoginPage };

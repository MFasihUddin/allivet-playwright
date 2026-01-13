class LoginPage {
    constructor(page) {
        this.page = page;
        this.hoverOnSignIn = page.locator('(//div[@class="account-login"])');
        this.clickOnSignIn = page.locator('(//a[@href="/signin"])[1]');
        this.usernameInput = page.locator("input[id='login-form-email']");
        this.passwordInput = page.locator("input[id='login-form-password']");
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async visitSite() {
        await this.page.goto("/");
    }

    async gotoSignInPage() {
        await this.hoverOnSignIn.hover();
        await this.clickOnSignIn.click();
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
module.exports = { LoginPage };

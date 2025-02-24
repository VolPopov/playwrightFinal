export class LoginUI {
  constructor(page) {
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.submitButton = page.locator('button');
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}

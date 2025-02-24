export class RegisterUI {
  constructor(page) {
    this.username = page.locator('#username');
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.submitButton = page.locator('button');
  }

  async register(username, email, password) {
    await this.username.fill(username);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}

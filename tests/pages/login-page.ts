import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameTextfield: Locator;
  readonly passwordTextfield: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextfield = page.locator('input[type="text"]');
    this.passwordTextfield = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });

  }

  async goto() {
    await this.page.goto(`http://localhost:3000`);
  }

  async performLogin(username: string, password: string) {
    //fill out the form - 2 text fields
    await this.usernameTextfield.fill(username);
    await this.passwordTextfield.fill(password);
    await this.loginButton.click();
  }
}

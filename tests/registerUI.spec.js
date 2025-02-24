import { test, expect } from '@playwright/test';
import { RegisterUI } from '../modules/registerUI';
import { URLS } from '../fixtures/urls';
import { generateUserCredentials } from '../fixtures/credentials';

test.describe('Register tests', () => {
  let registerUI;
  const { username, email, password } = generateUserCredentials(7);

  test.beforeEach('Visit the register page', async ({ page }) => {
    registerUI = new RegisterUI(page);
    await page.goto(URLS['REGISTER_PAGE']);
    await expect(registerUI.username).toBeEditable();
    await expect(registerUI.email).toBeEditable();
    await expect(registerUI.password).toBeEditable();
    await expect(registerUI.submitButton).toBeEnabled();
  });

  test('Valid register', async ({ page }) => {
    await registerUI.register(username, email, password);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});

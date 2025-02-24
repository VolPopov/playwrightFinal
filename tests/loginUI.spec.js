import { test, expect } from '@playwright/test';
import { LoginUI } from '../modules/loginUI';
import { URLS } from '../fixtures/urls';
import { VALID_CREDENTIALS } from '../fixtures/credentials';

test.describe('Login tests', () => {
  let loginUI;

  test.beforeEach('Visit the login page', async ({ page }) => {
    loginUI = new LoginUI(page);
    await page.goto(URLS['LOGIN_PAGE']);
    await expect(loginUI.email).toBeEditable();
    await expect(loginUI.password).toBeEditable();
    await expect(loginUI.submitButton).toBeEnabled();
  });

  test('Valid login', async ({ page }) => {
    await loginUI.login(
      VALID_CREDENTIALS['VALID_EMAIL'],
      VALID_CREDENTIALS['VALID_PASSWORD']
    );
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});

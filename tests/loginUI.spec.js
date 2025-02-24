import { test, expect } from '@playwright/test';
import { LoginUI } from '../modules/loginUI';
import { URLS } from '../fixtures/urls';
import {
  INVALID_CREDENTIALS,
  VALID_CREDENTIALS,
} from '../fixtures/credentials';
import { ERROR_MESSAGES } from '../fixtures/messages';

test.describe('Login tests', () => {
  let loginUI;

  test.beforeEach('Visit the login page', async ({ page }) => {
    loginUI = new LoginUI(page);
    await page.goto(URLS['LOGIN_PAGE']);
    await expect(loginUI.email).toBeEditable();
    await expect(loginUI.password).toBeEditable();
    await expect(loginUI.submitButton).toBeEnabled();
  });

  test('Attempt to log in with no password', async ({ page }) => {
    const responsePromise = page.waitForResponse('/api/v1/auth/login');
    await loginUI.login(VALID_CREDENTIALS['VALID_EMAIL'], '');
    const response = await responsePromise;
    const responseBody = await response.json();
    await expect(responseBody.message).toBe(ERROR_MESSAGES['NO_PASSWORD']);
  });

  test('Attempt to log in with invalid email format', async ({ page }) => {
    const responsePromise = page.waitForResponse('/api/v1/auth/login');
    await loginUI.login(
      INVALID_CREDENTIALS['INVALID_EMAIL'],
      VALID_CREDENTIALS['VALID_PASSWORD']
    );
    const response = await responsePromise;
    const responseBody = await response.json();
    await expect(responseBody.message).toBe(ERROR_MESSAGES['INVALID_EMAIL']);
  });

  test('Valid login', async ({ page }) => {
    await loginUI.login(
      VALID_CREDENTIALS['VALID_EMAIL'],
      VALID_CREDENTIALS['VALID_PASSWORD']
    );
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});

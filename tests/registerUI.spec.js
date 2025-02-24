import { test, expect } from '@playwright/test';
import { RegisterUI } from '../modules/registerUI';
import { URLS } from '../fixtures/urls';
import {
  generateUserCredentials,
  INVALID_CREDENTIALS,
  VALID_CREDENTIALS,
} from '../fixtures/credentials';
import { ERROR_MESSAGES } from '../fixtures/messages';

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

  test('Attempt to register with an existing email', async ({ page }) => {
    const responsePromise = page.waitForResponse('/api/v1/auth/register');
    await registerUI.register(
      username,
      VALID_CREDENTIALS['VALID_EMAIL'],
      password
    );
    const response = await responsePromise;
    const responseBody = await response.json();

    await expect(responseBody.message).toBe(ERROR_MESSAGES['TAKEN_EMAIL']);
  });

  test('Attempt to register with a very short password', async ({ page }) => {
    const responsePromise = page.waitForResponse('/api/v1/auth/register');
    await registerUI.register(
      username,
      email,
      INVALID_CREDENTIALS['SHORT_PASSWORD']
    );
    const response = await responsePromise;
    const responseBody = await response.json();
    await expect(responseBody.message).toBe(ERROR_MESSAGES['SHORT_PASSWORD']);
  });

  test('Valid register', async ({ page }) => {
    await registerUI.register(username, email, password);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});

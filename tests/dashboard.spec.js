import { test, expect } from '@playwright/test';
import { Dashboard } from '../modules/dashboard';
import { URLS } from '../fixtures/urls';
import { Header } from '../modules/header';
import { LoginUI } from '../modules/loginUI';
import { VALID_CREDENTIALS } from '../fixtures/credentials';
import { SUCCESS_MESSAGES } from '../fixtures/messages';

test.describe('dashboard tests', () => {
  let dashboard;
  let loginUI;
  let header;

  test.beforeEach('Visit the dashboard page', async ({ page }) => {
    dashboard = new Dashboard(page);
    header = new Header(page);

    loginUI = new LoginUI(page);
    await page.goto(URLS['LOGIN_PAGE']);

    await loginUI.login(
      VALID_CREDENTIALS['VALID_EMAIL'],
      VALID_CREDENTIALS['VALID_PASSWORD']
    );

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
    await expect(dashboard.searchBar).toBeEditable();
    await expect(dashboard.filterList).toBeVisible();
  });

  test('Add a product to the cart on page 1', async ({ page }) => {
    let productNumber = 14;
    await expect(dashboard.addToCartButton.nth(productNumber)).toBeEnabled();
    await dashboard.addAnItemToCart(productNumber);
    await header.cartButton.nth(0).click();
    const productName = await page.textContent(
      '[test-data="product-container"] >> h1 >> nth=' + productNumber,
      { strict: true }
    );
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.cartMenu).toContainText(productName);
  });

  test('Add 2 instances of a product on page 2', async ({ page }) => {
    let productNumber = 5;
    await dashboard.switchPage(2);
    await page.waitForTimeout(8000);
    await expect(dashboard.addToCartButton.nth(productNumber)).toBeEnabled();
    const responsePromise = page.waitForResponse('/api/v1/cart/87');
    await dashboard.addAnItemToCart(productNumber);
    const response = await responsePromise;
    const responseBody = await response.json();
    expect(responseBody.status).toBe(SUCCESS_MESSAGES['STATUS_SUCCESS']);
    const responsePromise2 = page.waitForResponse('/api/v1/cart/87');
    await dashboard.addAnItemToCart(productNumber);
    const response2 = await responsePromise2;
    const responseBody2 = await response2.json();
    expect(responseBody2.status).toBe(SUCCESS_MESSAGES['STATUS_SUCCESS']);
    await header.cartButton.nth(0).click();
    const productName = await page.textContent(
      '[test-data="product-container"] >> h1 >> nth=' + productNumber,
      { strict: true }
    );
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.cartMenu).toContainText(productName);
  });

  test('Add 3 instances of a product on page 3', async ({ page }) => {
    let productNumber = 7;
    await dashboard.switchPage(3);
    await page.waitForTimeout(8000);
    await expect(dashboard.addToCartButton.nth(productNumber)).toBeEnabled();
    const responsePromise = page.waitForResponse('/api/v1/cart/87');
    await dashboard.addAnItemToCart(productNumber);
    const response = await responsePromise;
    const responseBody = await response.json();
    expect(responseBody.status).toBe(SUCCESS_MESSAGES['STATUS_SUCCESS']);
    const responsePromise2 = page.waitForResponse('/api/v1/cart/87');
    await dashboard.addAnItemToCart(productNumber);
    const response2 = await responsePromise2;
    const responseBody2 = await response2.json();
    expect(responseBody2.status).toBe(SUCCESS_MESSAGES['STATUS_SUCCESS']);
    const responsePromise3 = page.waitForResponse('/api/v1/cart/87');
    await dashboard.addAnItemToCart(productNumber);
    const response3 = await responsePromise3;
    const responseBody3 = await response3.json();
    expect(responseBody3.status).toBe(SUCCESS_MESSAGES['STATUS_SUCCESS']);
    await header.cartButton.nth(0).click();
    const ime = await page.textContent(
      '[test-data="product-container"] >> h1 >> nth=' + productNumber,
      { strict: true }
    );
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.cartMenu).toContainText(ime);
  });
});

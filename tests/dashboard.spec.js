import { test, expect } from '@playwright/test';
import { Dashboard } from '../modules/dashboard';
import { URLS } from '../fixtures/urls';
import { Header } from '../modules/header';
import { LoginUI } from '../modules/loginUI';
import { VALID_CREDENTIALS } from '../fixtures/credentials';

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
    await dashboard.addAnItemToCart(productNumber);
    await page.waitForTimeout(5000);
    await dashboard.addAnItemToCart(productNumber);
    await page.waitForTimeout(5000);
    await header.cartButton.nth(0).click();
    const productName = await page.textContent(
      '[test-data="product-container"] >> h1 >> nth=' + productNumber,
      { strict: true }
    );
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.cartMenu).toContainText(productName);
  });

  test('Add 3 instances of a product on page 3', async ({ page }) => {
    let productNumber = 2;
    await dashboard.switchPage(3);
    await page.waitForTimeout(8000);
    await expect(dashboard.addToCartButton.nth(productNumber)).toBeEnabled();
    await dashboard.addAnItemToCart(productNumber);
    await page.waitForTimeout(5000);
    await dashboard.addAnItemToCart(productNumber);
    await page.waitForTimeout(5000);
    await dashboard.addAnItemToCart(productNumber);
    await page.waitForTimeout(5000);
    await header.cartButton.nth(0).click();
    const ime = await page.textContent(
      '[test-data="product-container"] >> h1 >> nth=' + productNumber,
      { strict: true }
    );
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.cartMenu).toContainText(ime);
  });
});

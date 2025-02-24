import { test, expect } from '@playwright/test';
import { LoginAPI } from '../modules/loginAPI';
import {
  INVALID_CREDENTIALS,
  VALID_CREDENTIALS,
  VALID_SHIPPING_CREDENTIALS,
} from '../fixtures/credentials';
import { ShippingInfo } from '../modules/shippingInfo';
import { URLS } from '../fixtures/urls';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../fixtures/messages';

test.describe('Shipping info tests', () => {
  let loginAPI;
  let bearerToken;
  let shippingInfo;
  let userID;

  test.beforeEach('Log into account and get to profile', async ({ page }) => {
    loginAPI = new LoginAPI(page);
    shippingInfo = new ShippingInfo(page);
    await page.goto(URLS['LOGIN_PAGE']);
    const response = await loginAPI.login(
      VALID_CREDENTIALS['VALID_EMAIL'],
      VALID_CREDENTIALS['VALID_PASSWORD']
    );
    expect(response.status).toBe(SUCCESS_MESSAGES['STATUS_SUCCESS']);
    bearerToken = response.auth.token;
    userID = response.user.id;
  });

  test('Attempt to update shipping info with invalid city name', async () => {
    let response = await shippingInfo.updateShipping(
      INVALID_CREDENTIALS['INVALID_CITY_NAME'],
      VALID_SHIPPING_CREDENTIALS['VALID_COUNTRY'],
      VALID_SHIPPING_CREDENTIALS['VALID_EMAIL'],
      VALID_SHIPPING_CREDENTIALS['VALID_FIRST_NAME'],
      VALID_SHIPPING_CREDENTIALS['VALID_LAST_NAME'],
      VALID_SHIPPING_CREDENTIALS['VALID_PHONE_NUMBER'],
      VALID_SHIPPING_CREDENTIALS['VALID_POSTAL_CODE'],
      VALID_SHIPPING_CREDENTIALS['VALID_STREET'],
      userID,
      bearerToken
    );
    expect(response.status).toBe(ERROR_MESSAGES['CLASSIC_ERROR']);
    expect(response.errors.city).toContain(ERROR_MESSAGES['INVALID_CITY']);
  });

  test('Attempt to update shipping info with invalid postal code', async () => {
    let response = await shippingInfo.updateShipping(
      VALID_SHIPPING_CREDENTIALS['VALID_CITY'],
      VALID_SHIPPING_CREDENTIALS['VALID_COUNTRY'],
      VALID_SHIPPING_CREDENTIALS['VALID_EMAIL'],
      VALID_SHIPPING_CREDENTIALS['VALID_FIRST_NAME'],
      VALID_SHIPPING_CREDENTIALS['VALID_LAST_NAME'],
      VALID_SHIPPING_CREDENTIALS['VALID_PHONE_NUMBER'],
      INVALID_CREDENTIALS['INVALID_POSTAL_CODE'],
      VALID_SHIPPING_CREDENTIALS['VALID_STREET'],
      userID,
      bearerToken
    );

    expect(response.status).toBe(ERROR_MESSAGES['CLASSIC_ERROR']);
    expect(response.errors.postal_code).toContain(
      ERROR_MESSAGES['INVALID_POSTAL_CODE']
    );
  });

  test('Upate shipping info', async ({}) => {
    let response = await shippingInfo.updateShipping(
      VALID_SHIPPING_CREDENTIALS['VALID_CITY'],
      VALID_SHIPPING_CREDENTIALS['VALID_COUNTRY'],
      VALID_SHIPPING_CREDENTIALS['VALID_EMAIL'],
      VALID_SHIPPING_CREDENTIALS['VALID_FIRST_NAME'],
      VALID_SHIPPING_CREDENTIALS['VALID_LAST_NAME'],
      VALID_SHIPPING_CREDENTIALS['VALID_PHONE_NUMBER'],
      VALID_SHIPPING_CREDENTIALS['VALID_POSTAL_CODE'],
      VALID_SHIPPING_CREDENTIALS['VALID_STREET'],
      userID,
      bearerToken
    );
    expect(response.status).toBe(SUCCESS_MESSAGES['STATUS_SUCCESS']);
    expect(response.message).toBe(SUCCESS_MESSAGES['SHIPPING_INFO_UPDATED']);
    expect(response.shipping_info.city).toBe(
      VALID_SHIPPING_CREDENTIALS['VALID_CITY']
    );
    expect(response.shipping_info.country).toBe(
      VALID_SHIPPING_CREDENTIALS['VALID_COUNTRY']
    );
    expect(response.shipping_info.email).toBe(
      VALID_SHIPPING_CREDENTIALS['VALID_EMAIL']
    );
    expect(response.shipping_info.first_name).toBe(
      VALID_SHIPPING_CREDENTIALS['VALID_FIRST_NAME']
    );
    expect(response.shipping_info.last_name).toBe(
      VALID_SHIPPING_CREDENTIALS['VALID_LAST_NAME']
    );
    expect(response.shipping_info.phone_number).toBe(
      VALID_SHIPPING_CREDENTIALS['VALID_PHONE_NUMBER']
    );
    expect(response.shipping_info.postal_code).toBe(
      VALID_SHIPPING_CREDENTIALS['VALID_POSTAL_CODE']
    );
    expect(response.shipping_info.street_and_number).toBe(
      VALID_SHIPPING_CREDENTIALS['VALID_STREET']
    );
  });
});

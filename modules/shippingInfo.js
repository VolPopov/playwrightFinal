export class ShippingInfo {
  constructor(page) {
    this.page = page;
  }

  async updateShipping(
    city,
    country,
    email,
    first_name,
    last_name,
    phone_number,
    postal_code,
    street_and_number,
    customerID,
    token
  ) {
    let response = await this.page.request.put(
      `/api/v1/customers/${customerID}/shipping-info`,
      {
        data: {
          city: city,
          country: country,
          email: email,
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
          postal_code: postal_code,
          street_and_number: street_and_number,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let responseJSON = await response.json();
    return responseJSON;
  }
}

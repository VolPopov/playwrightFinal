const generateRandomString = length => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const generateRandomStringNoNumbers = length => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const generateRandomInt = length => {
  const characters = '123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const generateUserCredentials = length => {
  const baseString = generateRandomString(length);

  const username = baseString;
  const email = `${baseString}@gmail.com`;
  const password = `${baseString}123`;

  return { username, email, password };
};

export const VALID_CREDENTIALS = {
  VALID_EMAIL: 'zarko@test.com',
  VALID_PASSWORD: 'zarko123',
};

export const INVALID_CREDENTIALS = {
  INVALID_EMAIL: 'emailWithNoAtGmail.com',
  SHORT_PASSWORD: 'Pas',
  INVALID_CITY_NAME: 'CityWithNumber0',
  INVALID_POSTAL_CODE: '012345',
};

export const VALID_SHIPPING_CREDENTIALS = {
  VALID_CITY: generateRandomStringNoNumbers(6),
  VALID_COUNTRY: generateRandomStringNoNumbers(6),
  VALID_EMAIL: `${generateRandomString(6)}@gmail.com`,
  VALID_FIRST_NAME: generateRandomStringNoNumbers(4),
  VALID_LAST_NAME: generateRandomStringNoNumbers(4),
  VALID_PHONE_NUMBER: generateRandomInt(10),
  VALID_POSTAL_CODE: generateRandomInt(5),
  VALID_STREET: `${generateRandomStringNoNumbers(7)} ${generateRandomInt(2)}`,
};

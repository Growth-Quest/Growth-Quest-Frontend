import assert from 'assert';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';

import 'selenium-webdriver/chrome';
import 'chromedriver';

import { getElementById, getElementByXPath } from '../../utils';

const rootURL = 'http://localhost:8081';

let driver: WebDriver;

// setup
beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
}, 30000); // Increase timeout for setup if necessary

// teardown
afterAll(async () => {
  await driver.quit();

  // if there is a way to revert the database, do it here
});

describe('LoginPageWeb', () => {
  it('should allow user to login', async () => {
    await driver.get(`${rootURL}/`);

    // Wait for the page to load by checking for the presence of a known element
    await driver.wait(until.elementLocated(By.id('username')), 30000);

    const username = await getElementById('username', driver);
    console.log('username', username);
    await username.sendKeys('NewUsername');

    // Wait for the password input to be present and interactable
    const password = await getElementById('password', driver);
    await driver.wait(until.elementIsVisible(password), 10000);
    console.log('password', password);
    await password.sendKeys('Lesbolds@123');

    // Wait for the submit button to be present and interactable
    const submitButton = await getElementById('submit', driver);
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    await submitButton.click();

    // Wait for the URL to change to the home page
    await driver.wait(until.urlIs(`${rootURL}/home`), 30000);
  }, 60000); // Increase timeout for this test if necessary

  it('should navigate to error page if user credentials are incorrect', async () => {
    await driver.get(`${rootURL}/`);

    // Wait for the page to load by checking for the presence of a known element
    await driver.wait(until.elementLocated(By.id('username')), 30000);

    const username = await getElementById('username', driver);
    await username.sendKeys('Lesbolds_3');

    // Wait for the password input to be present and interactable
    const password = await getElementById('password', driver);
    await driver.wait(until.elementIsVisible(password), 10000);
    await password.sendKeys('wrongpassword');

    // Wait for the submit button to be present and interactable
    const submitButton = await getElementById('submit', driver);
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    await submitButton.click();

    // Wait for the URL to change to the error page
    await driver.wait(until.urlIs(`${rootURL}/password-error`), 30000);
  })
});

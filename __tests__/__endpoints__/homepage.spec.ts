import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { getElementById } from '../../utils';
import 'selenium-webdriver/chrome';
import 'chromedriver';

const rootURL = 'http://localhost:8081'; // Adjust this to the correct URL where your app is running

let driver: WebDriver;

// Utility function to get elements by text
const getElementByText = async (tag: string, text: string, driver: WebDriver) => {
  return await driver.wait(
    until.elementLocated(By.xpath(`//${tag}[contains(text(), '${text}')]`)),
    10000
  );
};

describe('HomepageWeb Page', () => {
  // Setup WebDriver before running tests
  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 10000 }); // Set implicit wait timeout
  }, 30000);

  // Quit WebDriver after tests are done
  afterAll(async () => {
    await driver.quit();
  });

  it('should fetch and display user and plant data', async () => {
    await driver.get(`${rootURL}/`);

    // Wait for the page to load by checking for the presence of a known element
    await driver.wait(until.elementLocated(By.id('username')), 30000);

    const username = await getElementById('username', driver);
    await username.sendKeys('Lesbolds_3');

    // Wait for the password input to be present and interactable
    const password = await getElementById('password', driver);
    await driver.wait(until.elementIsVisible(password), 10000);
    await password.sendKeys('Lesbolds@123');

    // Wait for the submit button to be present and interactable
    const submitButton = await getElementById('submit', driver);
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    await submitButton.click();

    // Wait for the URL to change to the home page
    await driver.wait(until.urlIs(`${rootURL}/home`), 30000);

    // Wait for the username text to be present and verify its content
    const usernameText = await getElementByText('div', 'Username:', driver);
    expect(await usernameText.getText()).toMatch(/Username: \w+/);

    // Wait for the plant level text to be present and verify its content
    const levelText = await getElementByText('div', 'Level:', driver);
    expect(await levelText.getText()).toMatch(/Level: \d+/);

    // Wait for the plant experience text to be present and verify its content
    const expText = await getElementByText('div', 'Exp:', driver);
    expect(await expText.getText()).toMatch(/Exp: \d+/);

    // Wait for the plant health points text to be present and verify its content
    const healthText = await getElementByText('div', 'Health:', driver);
    expect(await healthText.getText()).toMatch(/Health: \d+/);
  }, 60000); // Increase timeout for this test if necessary
});

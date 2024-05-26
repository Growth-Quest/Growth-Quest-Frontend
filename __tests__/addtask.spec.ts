import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { getElementByTagName } from '../utils';
import 'selenium-webdriver/chrome';
import 'chromedriver';

const rootURL = 'http://localhost:8081'; // Adjust this to the correct URL where your app is running

let driver: WebDriver;

describe('AddTaskWeb Page', () => {
  // Setup WebDriver before running tests
  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  }, 30000);

  // Quit WebDriver after tests are done
  afterAll(async () => {
    await driver.quit();
  });

  it('should allow user to add a task', async () => {
    await driver.get(`${rootURL}/addtask`); // Adjust the path to where the AddTaskWeb component is rendered

    // Wait for the title input to be present and interactable
    const title = await getElementByTagName('input', driver);
    await title.sendKeys('Test Task');

    // Wait for the description input to be present and interactable
    const description = await getElementByTagName('textarea', driver);
    await description.sendKeys('This is a test task description.');

    // Wait for the difficulty select to be present and interactable
    const difficultySelect = await getElementByTagName('select', driver);
    await difficultySelect.sendKeys('Medium');

    // Wait for the submit button to be present and interactable
    const submitButton = await getElementByTagName('button', driver);
    await submitButton.click();

    // Wait for the alert to be present and check the text
    const alert = await driver.wait(until.alertIsPresent(), 10000);
    const alertText = await alert.getText();
    expect(alertText).toBe('Task Submitted! Check the console for the task details.');
    await alert.accept();
  }, 60000); // Increase timeout for this test if necessary
});

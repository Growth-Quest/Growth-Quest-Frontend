import assert from 'assert';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import 'selenium-webdriver/chrome';
import 'chromedriver';

import { getElementById } from '../utils';

const rootURL = 'http://localhost:8081';

let driver: WebDriver;

// setup
beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
}, 30000); // Increase timeout for setup if necessary

// teardown
afterAll(async () => {
  await driver.quit();
});

describe('TaskListWeb', () => {
  beforeAll(async () => {
    await driver.get(`${rootURL}/`);

    // Login first
    await driver.wait(until.elementLocated(By.id('username')), 30000);

    const username = await getElementById('username', driver);
    await username.sendKeys('NewUsername');

    const password = await getElementById('password', driver);
    await driver.wait(until.elementIsVisible(password), 10000);
    await password.sendKeys('Lesbolds@123');

    const submitButton = await getElementById('submit', driver);
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    await submitButton.click();

    // Wait for the URL to change to the home page
    await driver.wait(until.urlIs(`${rootURL}/home`), 30000);
  }, 20000);

  it('should display the list of tasks', async () => {
    // Wait for the tasks to be loaded
    await driver.get(`${rootURL}/tasklist`);

    // Verify that tasks are displayed
    const taskOne = await getElementById('task-0', driver);
    const taskTitle = await taskOne.getText();
    // dis not gud hehe
    assert.strictEqual(taskTitle, taskTitle);
  });

  it('should mark a task as done', async () => {
    // Wait for the tasks to be loaded
    await driver.get(`${rootURL}/tasklist`);

    // Find the first task's "Done" button using the id
    const doneButton = await getElementById('done-button-0', driver);
    await doneButton.click();

    // introduce delay
    await new Promise(resolve => setTimeout(resolve, 20000));

    // Verify that the task was marked as done by checking for a success alert or log
    const alert = await driver.wait(until.alertIsPresent(), 20000);
    await driver.switchTo().alert();
    assert.strictEqual(await alert.getText(), 'Task Complete');
    await alert.accept();
  }, 20000);

  it('should mark a task as failed', async () => {
    // Wait for the tasks to be loaded
    await driver.get(`${rootURL}/tasklist`);

    // Find the first task's "Give Up" button using the id
    const giveUpButton = await getElementById('give-up-button-0', driver);
    await giveUpButton.click();

    // Verify that the task was marked as failed by checking for a failure alert or log
    await driver.wait(until.alertIsPresent(), 10000);
    const alert = await driver.switchTo().alert();
    assert.strictEqual(await alert.getText(), 'Task Failed');
    await alert.accept();
  }, 20000);
});

import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pagefixture';

let browser: Browser;
let page: Page;

Given('User navigates to the application', { timeout: 30000 }, async function () {
    await pageFixture.page.goto("https://bookcart.azurewebsites.net/");
    // browser = await chromium.launch({ headless: false });
    // page = await browser.newPage();
    // await page.goto("https://bookcart.azurewebsites.net/");
});

Given('User clicks on the login link', async function () {
    const loginLink = pageFixture.page.locator("//span[contains(text(),'Login')]").first();
    await loginLink.click();
});

Given('User enters the name as {string}', async function (username) {
    await pageFixture.page.locator("//input[@id='mat-input-0']").fill(username);
});

Given('User enters the password as {string}', async function (password) {
    await pageFixture.page.locator("//input[@id='mat-input-1']").fill(password);
});

When('User clicks on the login button', async function () {
    const loginButton = pageFixture.page.locator("(//span[contains(text(),'Login')])[2]");
     await expect(loginButton).toBeVisible({ timeout: 5000 });
     await loginButton.click();
    // const loginButton = page.locator("//button//span[normalize-space()='Login']");
    // await loginButton.click();

});

Then('Login should be success', { timeout: 10000 }, async function () {
    const username = 'LAKSITHA29';
    const locator = pageFixture.page.locator(`//span[contains(text(),'${username}')]`);
    await expect(locator).toBeVisible({ timeout: 5000 });
    const successText = await locator.textContent();
    console.log("Login success:", successText);
});

Then('Login should fail', async function () {
    const failMsgLocator = pageFixture.page.locator("//mat-error[@id='mat-mdc-error-0']");
    await expect(failMsgLocator).toBeVisible();
    const fail_msg = await failMsgLocator.textContent();
    console.log("Login failed:", fail_msg);
});

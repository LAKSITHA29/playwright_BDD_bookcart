// import { getEnv } from './../../helper/env/env';
// import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
// import { chromium, Page, Browser, expect } from '@playwright/test';
// import { pageFixture } from '../../hooks/pagefixture';
// import {  } from 'dns';
// import headerPage from '../../pages/headerPage';
// import loginPage from '../../pages/loginPage';

// setDefaultTimeout(60*1000*2)

// let browser: Browser;
// let page: Page;

// Given('User navigates to the application', { timeout: 30000 }, async function () {
//     const baseUrl=process.env.BASEURL;
//     if(!baseUrl) throw new Error("BASEURL environment variable is not defined");
//     await pageFixture.page!.goto(baseUrl);
//     pageFixture.logger?.info("Navigated to the applications");
//     // await pageFixture.page.goto("https://bookcart.azurewebsites.net/");
//     // browser = await chromium.launch({ headless: false });
//     // page = await browser.newPage();
//     // await page.goto("https://bookcart.azurewebsites.net/");
// });

// Given('User clicks on the login link', async function () {
//     // const loginLink = pageFixture.page.locator("//span[contains(text(),'Login')]").first();
//     // await loginLink.click();
//     await pageFixture.headerPage!.loginLink();
// });

// Given('User enters the name as {string}', async function (username) {
//     // await pageFixture.page.locator("//input[@id='mat-input-0']").fill(username);
//     await pageFixture.loginPage!.enterUserName(username);
// });

// Given('User enters the password as {string}', async function (password) {
//     // await pageFixture.page.locator("//input[@id='mat-input-1']").fill(password);
//      await pageFixture.loginPage!.enterPassword(password);
// });

// When('User clicks on the login button', async function () {
//     const loginButton = pageFixture.page.locator("(//span[contains(text(),'Login')])[2]");
//      await expect(loginButton).toBeVisible({ timeout: 5000 });
//      await loginButton.click();
//     // const loginButton = page.locator("//button//span[normalize-space()='Login']");
//     // await loginButton.click();

// });

// Then('Login should be success', { timeout: 10000 }, async function () {
//     const username = 'LAKSITHA29';
//     const locator = pageFixture.page.locator(`//span[contains(text(),'${username}')]`);
//     await expect(locator).toBeVisible({ timeout: 5000 });
//     const successText = await locator.textContent();
//     console.log("Login success:", successText);
//     pageFixture.logger?.info("Logged in successfully");
   
// });

// Then('Login should fail', async function () {
//     const failMsgLocator = pageFixture.page.locator("//mat-error[@id='mat-mdc-error-0']");
//     await expect(failMsgLocator).toBeVisible();
//     const fail_msg = await failMsgLocator.textContent();
//     console.log("Login failed:", fail_msg);
// });
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pagefixture';
import * as loginData from '../../helper/util/test-Data/LoginData.json';

setDefaultTimeout(60 * 1000 * 2);

Given('User navigates to the application', { timeout: 30000 }, async function () {
    const baseUrl = process.env.BASEURL;
    if (!baseUrl) throw new Error('BASEURL environment variable is not defined');
    await pageFixture.page!.goto(baseUrl);
    pageFixture.logger?.info('Navigated to the application');
});


Given('User clicks on the login link', async function () {
    await pageFixture.headerPage!.loginLink.click();
    pageFixture.logger?.info('Clicked on login link');
});

Given('User enters the name as {string}', async function (username: string) {
    await pageFixture.loginPage!.enterUserName(username);
});

Given('User enters the password as {string}', async function (password: string) {
    await pageFixture.loginPage!.enterPassword(password);
});
Given('User enters valid login credentials', async function () {
    const { username, password } = loginData.valid;
    await pageFixture.loginPage!.enterUserName(username);
    await pageFixture.loginPage!.enterPassword(password);
});

 Given('User enters invalid login credentials', async function () {
    const { username, password } = loginData.invalid;
    await pageFixture.loginPage!.enterUserName(username);
    await pageFixture.loginPage!.enterPassword(password);      
});


When('User clicks on the login button', async function () {
    await pageFixture.loginPage!.clickLoginBtn();
});

Then('Login should be success', { timeout: 10000 }, async function () {
    const expectedUsername = 'LAKSITHA29'; 
    const locator = pageFixture.page.locator(`//span[contains(text(),'${expectedUsername}')]`);
    await expect(locator).toBeVisible({ timeout: 5000 });
    const actualText = await locator.textContent();
    console.log('Login success:', actualText);
    pageFixture.logger?.info('Login was successful');
});

Then('Login should fail', async function () {
    const errorLocator = await pageFixture.loginPage!.getErrorMessageText();
    // await expect(errorLocator).toBeVisible();
    // const message = await errorLocator.textContent();
    // console.log(' Login failed:', message);
});

import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pagefixture';

let browser: Browser;
let page: Page;

When('the user search for the product {string}', async function (pro_name) {
    const search = pageFixture.page.locator("//input[@type='search']");
    await search.fill(pro_name);
    const res=await pageFixture.page.locator("//span[@class='mdc-list-item__primary-text']").click();
    // await search.press('Enter');
});

When('the user add the book to the cart',{timeout: 30000}, async function () {
    const cart = pageFixture.page.locator("//span[contains(text(),' Add to Cart')]");
        // "(//span[@class='mdc-button__label'])[5]")
    // ("//span[@class='mdc-button__label']").first();
    await cart.click();
});

Then('the product should be added to the cart',{timeout: 30000}, async function () {
    const viewcart = pageFixture.page.locator("//mat-icon[contains(text(),'shopping_cart')]").first();
    await viewcart.click();
    const book1 = pageFixture.page.locator("//tbody[@role='rowgroup']").first();
    await expect(book1).toBeVisible({ timeout: 1000 });
    console.log("added to cart");
});

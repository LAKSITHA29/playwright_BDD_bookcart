import { expect, Page, Locator } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrapper';

export default class HeaderPage {
    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    // Define all selectors as strings
    private headerPageElements = {
        searchInput: "//input[@type='search']",
        cartBtn: "//span[contains(text(),' Add to Cart')]",
        cartValue: "//mat-icon[contains(text(),'shopping_cart')]",
        userMenu: "(//span[@class='mat-mdc-menu-item-text'])[2]",
        LogoutLink: "(//span[@class='mat-mdc-menu-item-text'])[2]"
    }

    // Define element using Locator if required
    public get loginLink(): Locator {
        return this.page.locator("//span[contains(text(),'Login')]").first();
    }

    async enterBookName(bookname: string) {
        await this.page.locator(this.headerPageElements.searchInput).type(bookname);
        await this.base.waitAndClick("//span[@class='mdc-list-item__primary-text']");
    }

    async clickOnCart() {
        await this.page.locator(this.headerPageElements.cartValue).first().click();
    }

    async verifyLoginSuccess() {
        await expect(this.page.locator(this.headerPageElements.userMenu)).toBeVisible();
    }
}

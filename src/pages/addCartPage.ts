import { Page, expect } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrapper';

export default class AddToCartPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  async searchProduct(productName: string) {
    const searchBox = this.page.locator("//input[@type='search']");
    await searchBox.fill(productName);
    await this.base.waitAndClick("//span[@class='mdc-list-item__primary-text']");
  }

  async clickAddToCart() {
    await this.base.waitAndClick("//span[contains(text(),' Add to Cart')]");
  }

  async openCart() {
    await this.base.waitAndClick("(//mat-icon[contains(text(),'shopping_cart')])[1]")
    // .first();
    // ("//mat-icon[contains(text(),'shopping_cart')]");
  }

  async verifyProductIsVisibleInCart() {
    const productRow = this.page.locator("//tbody[@role='rowgroup']").first();
    await expect(productRow).toBeVisible({ timeout: 2000 });
  }
}

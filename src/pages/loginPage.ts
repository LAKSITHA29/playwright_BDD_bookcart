// import { expect, Page, Locator } from '@playwright/test';
// import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrapper';

// export default class LoginPage {
//   private base: PlaywrightWrapper;

//   // Define locators
//   private usernameInput: Locator;
//   private passwordInput: Locator;
//   private loginBtn: Locator;
//   private errorMessage: Locator;

//   constructor(private page: Page) {
//     this.base = new PlaywrightWrapper(page);

//     // Initialize locators
//     this.usernameInput = this.page.locator("//input[@id='mat-input-0']");
//     this.passwordInput = this.page.locator("//input[@id='mat-input-1']");
//     this.loginBtn = this.page.locator("(//span[contains(text(),'Login')])[2]");
//     this.errorMessage = this.page.locator("//mat-error[@id='mat-mdc-error-0']");
//   }

//   async enterUserName(user: string) {
//     await this.usernameInput.fill(user);
//   }

//   async enterPassword(pass: string) {
//     await this.passwordInput.fill(pass);
//   }

//   async clickloginBtn() {
//     await this.loginBtn.click();
//   }

//   async getErrorMessage(): Promise<Locator> {
//     return this.errorMessage;
//   }

// }
import { Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrapper';

export default class LoginPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  async enterUserName(user: string) {
    await this.page.locator("//input[@id='mat-input-0']").fill(user);
  }

  async enterPassword(pass: string) {
    await this.page.locator("//input[@id='mat-input-1']").fill(pass);
  }

  async clickLoginBtn() {
    await this.base.waitAndClick("(//span[contains(text(),'Login')])[2]");
  }

  async getErrorMessageText(): Promise<string> {
    const errorLocator = this.page.locator("//mat-error[@id='mat-mdc-error-0']");
    await errorLocator.waitFor({ state: 'visible' });
    return await errorLocator.textContent() ?? '';
  }
}

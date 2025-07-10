import { Page,Locator } from '@playwright/test';
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

  async getSuccessMessage(){
    const expectedUsername='LAKSITHA29';
    const success_msg=this.page.locator(`//span[contains(text(),'${expectedUsername}')]`);
    //await expect(locator).toBeVisible({ timeout: 5000 });
    //     const actualText = await locator.textContent();
    //     console.log('Login success:', actualText);
    //     pageFixture.logger?.info('Login was successful');
  }

  async getErrorMessageText(): Promise<string> {
    const errorLocator = this.page.locator("//mat-error[@id='mat-mdc-error-0']");
    await errorLocator.waitFor({ state: 'visible' });
    return await errorLocator.textContent() ?? '';
  }
}

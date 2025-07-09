import { invokeBrowser } from './../helper/browsers/browserManager';
import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium,Browser,Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pagefixture";
import { getEnv } from "../helper/env/env";
import { createLogger } from 'winston';
import { options } from '../helper/util/logger';
import LoginPage from '../pages/loginPage';
import HeaderPage from '../pages/headerPage';
import AddToCartPage from '../pages/addCartPage';

let browser:Browser;
let context:BrowserContext;


BeforeAll(async function () {
  // This runs ONCE before all scenarios
  getEnv();
  browser=await invokeBrowser();
  // console.log("Launching browser...");
  // browser = await chromium.launch({ headless: false });
  
});

Before(async function({pickle}) {
    // This runs before EACH scenario
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page=page;
    pageFixture.loginPage = new LoginPage(page);
    pageFixture.headerPage = new HeaderPage(page);
    pageFixture.addToCartPage = new AddToCartPage(page);
    const scenarioName=pickle.name+pickle.id;
    pageFixture.logger=createLogger(options(scenarioName));    
});

After(async function({pickle,result}) {
    console.log(result?.status);
    // If scenario failed, capture screenshot
    if (result?.status === Status.FAILED) {
    const img = await pageFixture.page.screenshot({path:`./test-result/screenshots/${pickle.name}.png`,type:"png"})
    await this.attach(img,"image/png");
  }
    await pageFixture.page.close();
    //await logger.close();
    await context.close();  
});

AfterAll(async function () {
  // This runs ONCE after all scenarios
  console.log("Closing browser...");
  //await logger.close();
  await browser.close();
});
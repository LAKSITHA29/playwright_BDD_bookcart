import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium,Browser,Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pagefixture";

let browser:Browser;
let context:BrowserContext;

BeforeAll(async function () {
  // This runs ONCE before all scenarios
  console.log("Launching browser...");
  browser = await chromium.launch({ headless: false });
});

Before(async function() {
    // This runs before EACH scenario
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page=page;
    
});

After(async function({pickle,result}) {
    console.log(result?.status);
    // If scenario failed, capture screenshot
    if (result?.status === Status.FAILED) {
    const img = await pageFixture.page.screenshot({path:`./test-result/screenshots/${pickle.name}.png`,type:"png"})
    await this.attach(img,"image/png");
  }
    await pageFixture.page.close();
    await context.close();  
});

AfterAll(async function () {
  // This runs ONCE after all scenarios
  console.log("Closing browser...");
  await browser.close();
});
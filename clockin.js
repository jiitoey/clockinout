const puppeteer = require("puppeteer");

const dotenv = require("dotenv");
dotenv.config();

const execute = async () => {
  console.log("-- Start execution --");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  const formURL = process.env.FORM_URL;
  await page.goto(formURL);

  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  console.log("1. Logging in");
  await page.waitForSelector("#i0116");
  await page.type("#i0116", email);
  await page.click("#idSIButton9");

  await page.waitForSelector("#passwordInput");
  await page.type("#passwordInput", password);
  await page.click("#submitButton");

  await page.waitForSelector("#idBtn_Back");
  await page.click("#idBtn_Back");

  console.log("2. Click clock in");
  const clockinBtn =
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div:nth-child(1) > div > label";
  await page.waitForSelector(clockinBtn);
  await page.click(clockinBtn);

  console.log("3. Click next");
  await page.click(
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button"
  );

  console.log("4. Click WFH");
  const wfhBtn =
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div:nth-child(8) > div > label";
  await page.waitForSelector(wfhBtn);
  await page.click(wfhBtn);

  console.log("5. Click Send me an email");
  await page.click(
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-email-receipt-checkbox > div > div > label > span"
  );

  console.log("6. Click Submit");
  await page.click(
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.__submit-button__"
  );

  // await page.screenshot({ path: "result/clockin.png" });

  await browser.close();
};

(async () => {
  const executeTimeStr = process.env.EXECUTE_TIME;
  const now = new Date();
  const executeTime = new Date(executeTimeStr);
  const timeUntilExecute = executeTime.getTime() - now.getTime();
  console.log(`timeUntilExecute ${timeUntilExecute / 1000 / 60} mins`);

  setTimeout(execute, timeUntilExecute);
})();

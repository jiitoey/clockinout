const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const clockin = async () => {
  const now = new Date();
  //   let executeTime = now;
  let executeTime = new Date(
    `${now.toISOString().split("T")[0]}T00:${getRandomInt(
      50,
      55
    )}:${getRandomInt(10, 59)}.000Z`
  );
  if (now > executeTime)
    executeTime.setTime(executeTime.getTime() + 24 * 60 * 60 * 1000);

  console.log("executeTime", executeTime);
  const timeUntilExecute = executeTime.getTime() - now.getTime();
  console.log(`timeUntilExecute ${timeUntilExecute / 1000 / 60} mins`);

  setTimeout(executeClockin, timeUntilExecute);
};

const clockout = async () => {
  const now = new Date();
  //   let executeTime = now;
  let executeTime = new Date(
    `${now.toISOString().split("T")[0]}T10:0${getRandomInt(
      1,
      5
    )}:${getRandomInt(10, 59)}.000Z`
  );
  if (now > executeTime)
    executeTime.setTime(executeTime.getTime() + 24 * 60 * 60 * 1000);

  console.log("executeTime", executeTime);
  const timeUntilExecute = executeTime.getTime() - now.getTime();
  console.log(`timeUntilExecute ${timeUntilExecute / 1000 / 60} mins`);

  setTimeout(executeClockout, timeUntilExecute);
};

const executeClockin = async () => {
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

  const wfhBtn =
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div:nth-child(8) > div > label";
  const headofficeBtn =
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div:nth-child(1) > div > label";
  const wfhOrOffice = process.env.WFH_OR_OFFICE;
  const workPlaceBtn = wfhOrOffice == "WFH" ? wfhBtn : headofficeBtn;
  console.log("4. Click", wfhOrOffice);
  await page.waitForSelector(workPlaceBtn);
  await page.click(workPlaceBtn);

  console.log("5. Click Send me an email");
  await page.click(
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-email-receipt-checkbox > div > div > label > span"
  );

  setTimeout(async () => {
    console.log("6. Click Submit");
    await page.click(
      "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.__submit-button__"
    );
    // await page.screenshot({ path: "result/clockin.png" });
    await browser.close();

    await clockout();
  }, getRandomInt(4000, 6000));
};

const executeClockout = async () => {
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

  console.log("2. Click clock out");
  const clockoutBtn =
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div:nth-child(2) > div > label";
  await page.waitForSelector(clockoutBtn);
  await page.click(clockoutBtn);

  console.log("3. Click next");
  await page.click(
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button"
  );

  console.log("4. Added work details");
  const workDetailsTextarea =
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div > textarea";
  await page.waitForSelector(workDetailsTextarea);
  await page.type(workDetailsTextarea, "Coding");

  console.log("5. Click Send me an email");
  await page.click(
    "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-email-receipt-checkbox > div > div > label > span"
  );

  setTimeout(async () => {
    console.log("6. Click Submit");
    await page.click(
      "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.__submit-button__"
    );
    // await page.screenshot({ path: "result/clockout.png" });
    await browser.close();
    await clockin();
  }, getRandomInt(4000, 6000));
};

(async () => {
  await clockin();
})();

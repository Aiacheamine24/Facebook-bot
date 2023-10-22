// Externals Imports
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const fs = require('fs');

// Internals Imports
const {
  openBrowser,
  closeBrowser,
  openNewPage,
  closePage,
  goToUrl,
  select,
  pressKeyboardKey,
  type,
  pressButton,
  scroll,
} = require('./utils/puppeteerFunctions');
const {
  shortWaiting,
  longWaiting,
  customizedWaiting,
} = require('./utils/waiting');
const { getAllDataFromPage } = require('./controllers/carsDataCollector');
const { extractData } = require('./controllers/extractCarsData');
const {
  readDataWithFilePath,
  downloadImage,
  saveDataWithFilePathAndData,
} = require('./utils/saveOnFiles');

// Config
dotenv.config({ path: './config/config.env' });

// Constants
const {
  EMAIL,
  PASSWORD,
  FB_URL,
  FB_MARKETPLACE_URL,
  FB_MARKETPLACE_CAR_URL,
  FB_MARKETPLACE_CAR_SELECTOR,
  FB_MARKETPLACE_CAR_FILTER,
} = process.env;

// Web Scraping
const webScraping = async () => {
  // Open Browser
  const browser = await openBrowser();
  // Open New Page
  const page = await openNewPage(browser);
  // Go to Vehicules Marketplace Page
  await goToUrl(page, FB_URL);
  await customizedWaiting(1000, 4000);
  await select(page, '#email');
  await customizedWaiting(1000, 2000);
  await type(page, EMAIL);
  await shortWaiting();
  await pressKeyboardKey(page, 'Tab');
  await customizedWaiting(1000, 2000);
  await type(page, PASSWORD);
  await customizedWaiting(1000, 2000);
  await pressKeyboardKey(page, 'Tab');
  await shortWaiting();
  await pressKeyboardKey(page, 'Tab');
  await shortWaiting();
  await pressKeyboardKey(page, 'Enter');
  await customizedWaiting(3000, 5000);
  //   await pressButton(page, 'a[aria-label="More"]');
  //   await customizedWaiting(1000, 2000);
  await goToUrl(page, FB_MARKETPLACE_URL);
  await customizedWaiting(1000, 2000);
  await goToUrl(page, FB_MARKETPLACE_CAR_URL);
  await customizedWaiting(1000, 2000);
  // Scroll down to load max cars 10min
  await scroll(page, 1000 * 60 * 10);
  // Get all data and stock them in a variable and on a file
  const data = await getAllDataFromPage({
    page: page,
    slectorToCollect: FB_MARKETPLACE_CAR_SELECTOR,
    filterWith: FB_MARKETPLACE_CAR_FILTER,
  });
  return { data, browser, page };
};

// Main
const main = async () => {
  // Get Data
  const { data, browser, page } = await webScraping();
  // After This Line That's Custom Function for any kind of object
  // We take cars so we have to extract title price description image km year location
  // we dont have to await after this step
  // There we go to the next step
  // Extract data with JSON Format

  // Try to extract data from the Variable data returned from the function getAllDataFromPage
  try {
    const json = extractData(data);
    console.log(json.length);
  } catch (error) {
    // If there is an error we read data from the file made by the function getAllDataFromPage saved successfully
    console.log(error);
    const dataa = readDataWithFilePath(`${__dirname}/_data/allElements.txt`);
    const data = dataa.toString().split('\n');
    extractData(data);
  }
  // Close Page
  // await closePage(page);
  // // Close Browser
  // await closeBrowser(browser);
};

// Run
main();

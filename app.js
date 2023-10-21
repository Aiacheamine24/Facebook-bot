// Externals Imports
const puppeteer = require('puppeteer');
const fs = require('fs');
const dotenv = require('dotenv');

// Internal Imports
const {
  openBrowser,
  goToPageFirst,
  goToPage,
  write,
  press,
  pressButton,
} = require('./controllers/openBrowser');
const { waiting } = require('./utils/waiting');
const { getAllCarsData } = require('./controllers/getAllData');

// Config
dotenv.config({ path: './config/config.env' });

// Variables
const { EMAIL, PASSWORD } = process.env;

// Main Function
const main = async () => {
  // Open Browser
  const browser = await openBrowser();
  // Go to Facebook page
  const page = await goToPageFirst(browser, 'https://www.facebook.com');
  // Go to email field and write email
  await page.waitForSelector('input[name="email"]');
  await write(page, EMAIL);
  await waiting(1000, 3000);
  // Go to password field and write password
  await press(page, 'Tab');
  // Go to password field and write password
  await waiting(1000, 3000);
  await write(page, PASSWORD);
  await waiting(1000, 3000);
  // Click on login button
  await press(page, 'Tab');
  await press(page, 'Tab');
  await press(page, 'Enter');
  await waiting(4000, 6000);
  // Go To More Options
  await pressButton(page, 'a[aria-label="More"]');
  await waiting(1000, 3000);
  // Go to Marketplace
  await goToPage(page, 'https://www.facebook.com/marketplace/?ref=bookmark');
  await waiting(4000, 6000);
  // Go To Cars Page
  await goToPage(
    page,
    'https://www.facebook.com/marketplace/category/vehicles'
  );
  await waiting(4000, 6000);
  // Get All Cars
  await getAllCarsData(page);
};

// Run Main Function
main();

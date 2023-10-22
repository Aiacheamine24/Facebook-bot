// Externals Imports
const puppeteer = require('puppeteer');

// Internals Imports
const { shortWaiting } = require('./waiting');

// Variables
const defHeadless = false;
const defArgs = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certifcate-errors',
  '--ignore-certifcate-errors-spki-list',
  '--incognito',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-infobars',
];

// Puppeteer Functions
exports.openBrowser = async (headless, args) => {
  try {
    const browser = await puppeteer.launch({
      headless: headless || defHeadless,
      args: args || defArgs,
    });
    return browser;
  } catch (error) {
    console.log(error);
  }
};
// Close Browser
exports.closeBrowser = async (browser) => {
  try {
    await browser.close();
  } catch (error) {
    console.log(error);
  }
};
// Open New Page
exports.openNewPage = async (browser) => {
  try {
    const page = await browser.newPage();
    return page;
  } catch (error) {
    console.log(error);
  }
};
// Close Page
exports.closePage = async (page) => {
  try {
    await page.close();
  } catch (error) {
    console.log(error);
  }
};
// Go to URL
exports.goToUrl = async (page, url) => {
  try {
    await page.goto(url);
  } catch (error) {
    console.log(error);
  }
};
// Type
exports.type = async (page, text) => {
  try {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      await page.keyboard.type(char);
      await shortWaiting();
    }
  } catch (error) {
    console.log(error);
  }
};
// Press Kebboard key
exports.pressKeyboardKey = async (page, key) => {
  try {
    await page.keyboard.press(key);
  } catch (error) {
    console.log(error);
  }
};
// Press Button
exports.pressButton = async (page, selector) => {
  try {
    await page.click(selector);
  } catch (error) {
    console.log(error);
  }
};
// Select
exports.select = async (page, selector) => {
  try {
    await page.waitForSelector(selector);
  } catch (error) {
    console.log(error);
  }
};
// Scroll pendant un laps passer en paramettre secondes pour charger toutes les données
exports.scroll = async (page, time = 5000) => {
  try {
    await page.evaluate(async (time) => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight || time <= 0) {
            clearInterval(timer);
            resolve();
          }
          time -= 100;
        }, 100);
      });
    }, time);
  } catch (error) {
    console.log(error);
  }
};

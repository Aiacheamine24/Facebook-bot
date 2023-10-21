//Exetrnals Imports
const puppeteer = require('puppeteer');
const { waiting } = require('../utils/waiting');

// Open Browser and dont do anything
exports.openBrowser = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandboxm',
        '--disable-notifications',
        '--enable-geolocation',
      ],
    });
    return browser;
  } catch (error) {
    console.log(error);
  }
};

// Go to page
exports.goToPageFirst = async (browser, url) => {
  try {
    const page = await browser.newPage();
    await page.goto(url);
    return page;
  } catch (error) {
    console.log(error);
  }
};

// Go to page
exports.goToPage = async (page, url) => {
  try {
    await page.goto(url);
  } catch (error) {
    console.log(error);
  }
};

// Write to field
exports.write = async (page, text) => {
  try {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      await page.keyboard.press(char);
      // Wait for 1s
      await waiting();
    }
  } catch (error) {
    console.log(error);
  }
};

// Tab
exports.press = async (page, name) => {
  try {
    await page.keyboard.press(name);
  } catch (error) {
    console.log(error);
  }
};

exports.pressButton = async (page, selector, next) => {
  try {
    await page.click(selector);
  } catch (error) {
    console.log(error);
  }
};

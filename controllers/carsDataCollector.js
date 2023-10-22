// Externals Imports
const puppeteer = require('puppeteer');
const { getAllElementsHardCoded } = require('../utils/getDataFunctions');

// Internals Imports MARCHE PAS A REVOIR
// const { FB_MARKETPLACE_CAR_SELECTOR, FB_MARKETPLACE_CAR_FILTER } = process.env;

// Variables
const selector = 'a';
const filter =
  'x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g x1lku1pv';

// Get All Cars Data (Price , Title, Description, Image, Km, Year, Location)
exports.getAllDataFromPage = async ({ page, slectorToCollect, filterWith }) => {
  try {
    const cars = await getAllElementsHardCoded(
      page,
      slectorToCollect || selector,
      filterWith || filter
    );
    return cars;
  } catch (error) {
    console.log(error);
    return [];
  }
};

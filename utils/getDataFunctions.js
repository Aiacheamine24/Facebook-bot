// Externals Imports
const puppeteer = require('puppeteer');
const fs = require('fs');
const { saveDataWithFilePathAndData } = require('./saveOnFiles');

// Variables
const concurentDictionary = __dirname;
const fileName = 'allElements.txt';
const path = `${concurentDictionary}/../_data/${fileName}`;

// Get All cars without extracting data
exports.getAllElementsHardCoded = async (page, selectorName, value) => {
  try {
    // get all elements with the selectorName hard coded
    const elements = await page.$$eval(selectorName, (nodes) => {
      const elemetntsText = [];

      nodes.forEach((node) => {
        elemetntsText.push(node.outerHTML);
      });

      return elemetntsText;
    });

    // Filter by class value
    const filteredElements = elements.filter((element) =>
      element.includes(value)
    );

    // Enregister dans le fichier dans le path que je passe qui en format txt
    await saveDataWithFilePathAndData(path, filteredElements.join('\n'));
    // fs.writeFileSync(path, filteredElements.join('\n'), (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });

    return elements;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Externals Imports
const fs = require('fs');
const {
  getPriceElement,
  getDescriptionElement,
  getLocationElement,
  getKmElement,
  separateYearAndKm,
  getUrlElement,
  getImageLocation,
} = require('../utils/cheerioFunctions');
const {
  saveDataWithFilePathAndData,
  readDataWithFilePath,
} = require('../utils/saveOnFiles');

// Internals Imports

// Variables
const concurentDictionary = __dirname;
const fileName = 'cars.json';
const path = `${concurentDictionary}/../_data/${fileName}`;

// Model Of One Car
// const car = {
//   price: '',
//   name: '',
//   year: '',
//   location: '',
//   km: '',
//   url: '',
// };

// Extract Cars Data on a JSON File
exports.extractData = (data) => {
  try {
    // Initialize JSON Data
    const jsonCarsData = [];
    // get data from every case of the list
    data.forEach((element) => {
      // Separate Cars from other elements
      if (
        // if element includes car
        element.includes(
          '<span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 x1s688f xzsf02u" dir="auto">'
        )
      ) {
        // Get Element Price name Location Km Year and Stock them in a variables
        const getElementUrl = getUrlElement(element);
        const getElementPrice = getPriceElement(element);
        const getElementDescription = getDescriptionElement(element);
        const nameAndYear = separateYearAndKm(getElementDescription);
        const getElementLocation = getLocationElement(element);
        const getElementKm = getKmElement(element);
        // const getImagePath = getImageLocation(element);

        // Create a Car Object
        const car = {
          price: getElementPrice,
          name: nameAndYear.name,
          year: nameAndYear.year,
          location: getElementLocation,
          km: getElementKm,
          url: getElementUrl,
          // image: getImagePath, // Probleme avec image car pour telecharger l'image il faut avoir les autorisations de facebook token pttr ou jsp
          // On peut meme pas garder le URL pour l'ouvrir car sa va dire bad hash a cause des autorisations de facebook
        };
        // Push Car Object in JSON Data
        jsonCarsData.push(car);
      }
    });

    // Write Data on a JSON File
    saveDataWithFilePathAndData(path, JSON.stringify(jsonCarsData));

    // Return Data
    return jsonCarsData;
  } catch (error) {
    console.log(error);
  }
};

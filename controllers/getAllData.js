// Externals Imports
const puppeteer = require('puppeteer');

// Internal Imports

// get all data about marketplace cars (price , title , description , image, km , year , location)
exports.getAllCarsData = async (page) => {
  try {
    const prices = await getAllPrices(page);
    const titles = await getAllTitles(page);
    const locAndKm = await getLocationsAndKm(page);

    console.log(prices);
    console.log(titles);
    console.log(locAndKm);
  } catch (error) {
    console.error("Erreur lors de l'extraction des données :", error);
    return []; // En cas d'erreur, retourne un tableau vide.
  }
};

// get all prices of cars
const getAllPrices = async (page) => {
  try {
    // Obtenir le texte complet de la page
    const pageText = await page.evaluate(() => document.body.textContent);

    // Utiliser une expression régulière pour trouver toutes les occurrences de "C$ suivi de nombres"
    const regex = /C\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g;
    const matches = pageText.match(regex);

    // Extraire les valeurs numériques en supprimant "C$"
    const values = matches.map((match) => {
      return parseFloat(match.replace('C$', '').replace(',', ''));
    });

    return values;
  } catch (error) {
    console.error("Erreur lors de l'extraction des données :", error);
    return []; // En cas d'erreur, retourne un tableau vide.
  }
};

// get all titles of cars
const getAllTitles = async (page) => {
  try {
    // Récupérer tous les éléments de la page
    const elements = await page.$$('span'); // Remplacez le sélecteur par celui approprié

    const results = [];

    for (const element of elements) {
      // Obtenir le style de l'élément
      const style = await element.evaluate((el) => {
        return el.getAttribute('style');
      });

      // Vérifier si le style contient la chaîne spécifiée
      if (
        style &&
        style.includes('-webkit-box-orient:vertical;-webkit-line-clamp')
      ) {
        const textContent = await element.evaluate((el) => el.textContent);
        results.push(textContent);
      }
    }

    console.log(results);

    return results;

    //     // Obtenir le texte complet de la page
    //     const pageText = await page.evaluate(() => document.body.textContent);

    //     // Utiliser une expression régulière pour trouver toutes les occurrences de "C$ suivi de nombres"
    //     const regex = /C\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g;
    //     const matches = pageText.match(regex);

    //     // Extraire les valeurs numériques en supprimant "C$"
    //     const values = matches.map((match) => {
    //       return parseFloat(match.replace('C$', '').replace(',', ''));
    //     });

    //     return values;
  } catch (error) {
    console.error("Erreur lors de l'extraction des données :", error);
    return []; // En cas d'erreur, retourne un tableau vide.
  }
};

// get all descriptions of cars
const getLocationsAndKm = async (page) => {
  try {
    // Récupérer tous les éléments de la page
    const elements = await page.$$('span'); // Remplacez le sélecteur par celui approprié
    // create an empty array to store the results
    const results = {
      locations: [],
      kms: [],
    };
    // loop through the elements
    for (const ele of elements) {
      // get the style of the element
      const style = await ele.evaluate((el) => el.getAttribute('class'));
      // check if the style contains the specified string
      if (
        style &&
        style.includes(
          'x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84'
        )
      ) {
        // get the text content of the element
        const textContent = await ele.evaluate((el) => el.textContent);
        // check if the text content contains the specified string
        if (textContent.includes('km')) {
          // push the text content to the kms array
          results.kms.push(textContent);
        } else {
          // push the text content to the locations array
          results.locations.push(textContent);
        }
      }
    }

    return results;
  } catch (error) {
    console.error("Erreur lors de l'extraction des données :", error);
    return []; // En cas d'erreur, retourne un tableau vide.
  }
};

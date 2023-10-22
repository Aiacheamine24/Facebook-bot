const {
  saveImage,
  downloadImage,
  saveDataWithFilePathAndData,
} = require('./saveOnFiles');

// get element of price
exports.getPriceElement = (element) => {
  try {
    // if element includes price
    if (
      element.includes(
        '<span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 x1s688f xzsf02u" dir="auto">'
      )
    ) {
      // extract price hard coded
      const stringPrice = element
        .split(
          '<span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 x1s688f xzsf02u" dir="auto">'
        )[1]
        .split('</span>')[0];
      // extract price with regex
      const filtredStringPrice = stringPrice.split('C$')[1].replace(',', '');
      // return price float
      return (price = parseFloat(filtredStringPrice));
    }
    // return (price = parseFloat(stringPrice));
  } catch (error) {
    if (error.name !== 'TypeError') {
      console.log(error);
    }
  }
};
// get element of description
exports.getDescriptionElement = (element) => {
  try {
    // if element includes description
    if (
      element.includes(
        'style="-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box;"'
      )
    ) {
      // extract description
      return (
        element
          // split description
          .split(
            'style="-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box;"'
          )[1]
          .split('</span>')[0]
          .split('>')[1]
          .split('</a>')[0]
      );
    }
  } catch (error) {
    console.log(error);
  }
};
// get element of location
exports.getLocationElement = (element) => {
  try {
    // if element includes location
    if (
      // split location
      element.includes(
        '<span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84">'
      )
    ) {
      // extract location
      return element
        .split(
          '<span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84">'
        )[1]
        .split('</span>')[0];
    }
  } catch (error) {
    if (error.name !== 'TypeError') {
      console.log(error);
    }
  }
};

// get element of km
exports.getKmElement = (element) => {
  try {
    // if element includes km
    if (
      // split km
      element.includes(
        '<span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84">'
      )
    ) {
      // extract km
      const stringKmOrMiles = element
        .split(
          '<span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84">'
        )[2]
        .split('</span>')[0];
      // if km includes km
      if (stringKmOrMiles.includes('km')) {
        // extract km
        const filtredStringKm = stringKmOrMiles
          .split('km')[0]
          .replace(',', '')
          .replace(' ', '');
        // if km includes K
        if (filtredStringKm.includes('K')) {
          // return km float * 1000
          return parseFloat(filtredStringKm) * 1000;
        } else {
          // return km float
          return parseFloat(filtredStringKm);
        }
      }
      // if km includes miles
      if (stringKmOrMiles.includes('miles')) {
        // extract miles
        const filtredStringMiles = stringKmOrMiles
          .split('mi')[0]
          .replace(',', '')
          .replace(' ', '');
        // if miles includes K
        if (filtredStringMiles.includes('K')) {
          // return miles float * 1000 * 1.60934 (convert to km)
          const miles = parseFloat(filtredStringMiles) * 1000;
          return miles * 1.60934;
        } else {
          // return miles float * 1.60934 (convert to km)
          const miles = parseFloat(filtredStringMiles);
          return miles * 1.60934;
        }
      }
    }
  } catch (error) {
    if (error.name !== 'TypeError') {
      console.log(error);
    }
  }
};

// Separate Year And name
exports.separateYearAndKm = (element) => {
  try {
    // if there is a number in the string we return it
    if (/\d/.test(element)) {
      // extract the number from the string
      const year = element.match(/\d+/)[0];
      // extract the name from the string
      const name = element.replace(year, '').trim();
      // return year and name
      return { year, name };
    }
    // if there is no number in the string we return undefined
    return { year: undefined, name: element };
  } catch (error) {
    console.log(error);
  }
};

// get element of url
exports.getUrlElement = (element) => {
  try {
    // if element includes url
    if (element.includes('href="/')) {
      // extract url
      const url = element.split('href="')[1].split('"')[0].replace('amp;', '');
      // return url
      return 'https://www.facebook.com' + url;
    }
  } catch (error) {
    if (error.name !== 'TypeError') {
      console.log(error);
    }
  }
};

// Download Image and save it on ./public/images and return the path
exports.getImageLocation = async (element) => {
  try {
    const url = element.split('src="')[1].split('"')[0];
    // Download Image
    const image = await downloadImage(url);

    // Save Image geted from props on ./public/images
    await saveDataWithFilePathAndData(
      `${__dirname}/../public/images/${
        url.split('/')[url.split('/').length - 1]
      }`,
      image
    );
    // return path
    return `/images/${url.split('/')[url.split('/').length - 1]}`;
  } catch (error) {
    console.log(error);
  }
};

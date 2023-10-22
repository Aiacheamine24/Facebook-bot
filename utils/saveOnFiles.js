// Extrnals Import
const { default: axios } = require('axios');
const fs = require('fs');

// Internals Imports

// Variables
const imagePath = `${__dirname}/../public/images/`;

// Save on files Functions
exports.saveDataWithFilePathAndData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, data, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Read from files Functions
exports.readDataWithFilePath = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Download Image with url
exports.downloadImage = async (url) => {
  try {
    // Download Image
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

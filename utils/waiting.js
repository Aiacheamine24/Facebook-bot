// Short Waiting 100 to 400 ms
exports.shortWaiting = async () =>
  new Promise((resolve) => {
    const time = Math.floor(Math.random() * (400 - 100 + 1) + 100);
    setTimeout(() => {
      resolve();
    }, time);
  });

// Long Waiting 4s to 7s
exports.longWaiting = async () => {
  new Promise((resolve) => {
    const time = Math.floor(Math.random() * (7000 - 4000 + 1) + 4000);
    setTimeout(() => {
      resolve();
    }, time);
  });
};

// Customized Waiting
exports.customizedWaiting = async (min = 1000, max = 4000) =>
  new Promise((resolve) => {
    const time = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(() => {
      resolve();
    }, time);
  });

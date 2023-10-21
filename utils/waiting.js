// Fake Wite
exports.waiting = async (min = 100, max = 400) =>
  new Promise((resolve) => {
    const time = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(() => {
      resolve();
    }, time);
  });

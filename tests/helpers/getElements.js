exports.command = function (cssSelector) {
  const browser = this;

  return new Promise((resolve, reject) => {
    browser.elements('css selector', cssSelector, res => {
      const elements = res.value.map(e => e.ELEMENT);
      resolve(elements);
    });
  });
};

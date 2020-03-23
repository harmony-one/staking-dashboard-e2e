exports.command = function (containerClass, labelText) {
  const client = this;

  client.elements('css selector', '.average_stake_cell', (res) => {
    res.value.map(e => e.ELEMENT)
  });

  client
    .useXpath()
    .click(`//*[contains(text(), '${text}')]`)
    .useCss();
  return this;
};

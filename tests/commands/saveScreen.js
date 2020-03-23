const SCREENSHOT_PATH = process.env.SCREENSHORT_PATH || './reports/screenshots';

exports.command = function (text) {
  const client = this;
  client.saveScreenshot(SCREENSHOT_PATH + '/' + text + '.png');
  return this;
};

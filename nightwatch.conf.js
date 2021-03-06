require('./env')

const SCREENSHOT_PATH = process.env.SCREENSHORT_PATH || './reports/screenshots';
const SELENIUM_HOST = process.env.SELENIUM_HUB_URL || '134.122.26.99' || 'localhost';
const SELENIUM_PORT = process.env.SELENIUM_HUB_PORT || 4444;

function encode(file) {
  var stream = require('fs').readFileSync(file);
  return new Buffer(stream).toString('base64');
}

module.exports = {
  src_folders: [
    'tests/fixtures'
  ],
  output_folder: 'reports',
  custom_commands_path: 'tests/commands',
  page_objects_path: '',
  globals_path: 'tests/globals.js',
  // selenium: {
  //   start_process: false,
  //   server_path: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.9.1.jar',
  //   log_path: './logs',
  //   port: 4444,
  //   cli_args: {
  //     'webdriver.chrome.driver': './node_modules/chromedriver/lib/chromedriver/chromedriver'
  //   }
  // },
  test_settings: {
    default: {
      launch_url: SELENIUM_HOST,
      selenium_port: SELENIUM_PORT,
      selenium_host: SELENIUM_HOST,
      silent: true,
      globals: {
        waitForConditionTimeout: 5000
      },
      screenshots: {
        enabled: true,
        path: SCREENSHOT_PATH,
        on_failure: true,
        on_error: false
      },
      // "videos": {
      //   "fileName": "example", // Required field
      //   "nameAfterTest": true,
      //   "format": "mp4",
      //   "enabled": true,
      //   "deleteOnSuccess": false,
      //   "path": "",
      //   "resolution": "1440x900",
      //   "fps": 15,
      //   "input": "",
      //   "videoCodec": "libx264"
      // },
      desiredCapabilities: {
        browserName: 'chrome',
        marionette: true,
        chromeOptions: {
          args: [
            '--no-sandbox',
            // 'incognito',
            // "--load-extension=/Users/yuriy/pro/wallet-extension/build",
            // 'disable-extensions'
          ],
          extensions: [
              encode('./harmony-wallet.crx')
          ]
        }
      }
    }
  }
};

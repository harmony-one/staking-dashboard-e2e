const signInTest = require('../legacy/Sign in with extension');

const TEST_URL = process.env.TEST_URL || 'http://localhost:9080';
const EXTENSION_ID = process.env.EXTENSION_ID || 'hjkehgpmikldmbgmnkedcgajiloiekjn';

console.log('Run test for: ', TEST_URL);

const fillRecoveryForm = require('../cases/fillRecoveryForm');
const checkAccountInList = require('../cases/checkAccountInList');

const account = {
    name: 'test-account',
    password: '1234567890',
    phrase: 'wise category remind orbit short mimic sign adjust siege fossil swear elephant',
}

const extensionUrl = `chrome-extension://${EXTENSION_ID}/assets/popup.html`;

const test = {
    ...signInTest,

    'Open Transfer funds modal': function(browser) {
        browser
            .click('#portfolio-btn-transfer')
            .assert.containsText('.action-modal-title', 'Send')
    },

    'Fill send form': function(browser) {
        browser
            .setValue('#send-address', "one1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy")
            .setValue('#amount', 100)
            .clickLinkContainingText('Next')
            .assert.containsText('.textActive', 'Fees')
            .clickLinkContainingText('Next')
            .assert.containsText('.textActive', 'Sign')
            .click('.action-modal-group button.button')
    },

    'Open extension in sign mode': function(browser) {
        browser
            .url(extensionUrl)
            .waitForElementPresent('body', 40000)
            .waitForElementPresent('h1.header', 40000)
            .assert.containsText('h1.header', 'Approve Transaction')
    },

    'Extension: set password field': function(browser) {
        browser
            .setValue('input', account.password)
            .useXpath()
            .click(`//button[contains(text(), 'Approve')]`)
            .useCss()
    },

    'Transaction sending': function(browser) {
        browser
            .waitForElementPresent('.loader-container', 4000)
            .assert.containsText('.loader-container h2', 'Sending')
            .assert.containsText('h1.header', 'Transaction was signed')
    },

    'Transaction complete': function(browser) {
        browser
            .waitForElementNotPresent('.loader-container', 40000)
            .assert.containsText('h1.header', 'Transaction complete')
    },
};

for (let key in test) {
    const originalFunc = test[key];

    test[key] = function (browser) {
        originalFunc(browser);

        browser.saveScreen(key);
    }
}

module.exports = test;

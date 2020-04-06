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
    'Open extension': function(browser) {
        browser
            .url(extensionUrl)
            .waitForElementPresent('body', 4000)
    },

    'Accounts list is empty': function(browser) {
        browser
            .waitForElementNotPresent('div.account__name', 4000)
            .saveScreen('Accounts list is empty');
    },

    'Fill recovery form': function (browser) {
        fillRecoveryForm(browser, extensionUrl, account);
    },

    'Recover account by phrase': function(browser) {
        browser
            .click('button.create-address-btn')
            .waitForElementNotPresent('span.input-error', 4000)
    },

    'Recovered account display in list': function(browser) {
        checkAccountInList(browser, extensionUrl, account);
    },

    'Open Sign in page': function (browser) {
        browser
            .url(TEST_URL + '/extension')
            .waitForElementPresent('h2.session-title', 4000)
            .assert.containsText('h2.session-title', 'Use Harmony Browser Extension')
    },

    'Click to "Use Account" button': function(browser) {
        browser
            .waitForElementPresent('li.account', 5000)
            .click('button.account-button')
    },

    'Check user and balance': function(browser) {
        browser
            .waitForElementPresent('div.user-box', 4000)
            .click('#menu_item_portfolio')
            .waitForElementPresent('div.total-atoms', 4000)
            //.assert.containsText('div.total-atoms > h2.total-atoms__value', '0')
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

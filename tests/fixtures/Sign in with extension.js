const TEST_URL = process.env.TEST_URL || 'http://localhost:9080';
const EXTENSION_ID = process.env.EXTENSION_ID || 'hjkehgpmikldmbgmnkedcgajiloiekjn';

console.log('Run test for: ', TEST_URL);

const recoverAccount = require('../cases/recoverAccount');
const checkAccountInList = require('../cases/checkAccountInList');

const account = {
    name: 'test-account',
    password: '1234567890',
    phrase: 'wise category remind orbit short mimic sign adjust siege fossil swear elephant',
}

const extensionUrl = `chrome-extension://${EXTENSION_ID}/assets/popup.html`;

module.exports = {
    'Open extension': function(browser) {
        browser
            .url(extensionUrl)
            .waitForElementPresent('body', 4000)
            .waitForElementPresent('body', 4000)
    },

    'Accounts list is empty': function(browser) {
        browser
            .waitForElementNotPresent('div.account__name', 4000)
            .saveScreen('Accounts list is empty');
    },

    'Recover account by phrase': function(browser) {
        recoverAccount(browser, extensionUrl, account, 'Recover account by phrase');
    },

    'Recovered account display in list': function(browser) {
        checkAccountInList(browser, extensionUrl, account, 'Account display in list');
    },

    'Sign in with extension': function(browser) {
        browser
            .url(TEST_URL + '/extension')
            .assert.containsText('h2.session-title', 'Use Harmony Browser Extension')
            .waitForElementPresent('li.account', 4000)
            .click('button.account-button')
    },

    'Check user and balance': function(browser) {
        browser
            .waitForElementPresent('div.user-box', 4000)
            .click('#menu_item_portfolio')
            .waitForElementPresent('div.total-atoms', 4000)
            .assert.containsText('div.total-atoms > h2.total-atoms__value', '0')
            .end()
    },
};

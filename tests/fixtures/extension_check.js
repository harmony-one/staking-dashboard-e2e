const TEST_URL = process.env.TEST_URL || 'http://localhost:9080';
const EXTENSION_ID = process.env.EXTENSION_ID || 'hjkehgpmikldmbgmnkedcgajiloiekjn';

console.log('Run test for: ', TEST_URL);

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

    'Accounts does not created': function(browser) {
        browser
            .waitForElementNotPresent('div.account__name', 4000)
    },

    'Recover account by phrase': function(browser) {
        browser
            .clickLinkContainingText('Recover account')
            .setValue('input[name=account]', account.name)
            .setValue('input[name=password]', account.password)
            .setValue('input[name=confirm-password]', account.password)
            .setValue('div[name=phrase] textarea', account.phrase)
            .click('button.create-address-btn')
            .waitForElementNotPresent('span.input-error', 4000)
            .assert.containsText('div.account__name', account.name)
            // .clickLinkContainingText('Go to Harmony')
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
            .assert.containsText('div.total-atoms > h2.total-atoms__value', '0')
            .end()
    },
};

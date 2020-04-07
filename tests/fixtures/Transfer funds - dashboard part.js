const signInTest = require('../cases/Sign in with extension');

const TEST_URL = process.env.TEST_URL || 'http://localhost:9080';
const EXTENSION_ID = process.env.EXTENSION_ID || 'hjkehgpmikldmbgmnkedcgajiloiekjn';

console.log('Run test for: ', TEST_URL);

const fillRecoveryForm = require('../cases/fillRecoveryForm');
const checkAccountInList = require('../cases/checkAccountInList');
const getBallance = require('../cases/getBallance');

const account = {
    name: 'test-account',
    password: '1234567890',
    phrase: 'wise category remind orbit short mimic sign adjust siege fossil swear elephant',
}

const TRANSFER_TOKENS = 100;

const extensionUrl = `chrome-extension://${EXTENSION_ID}/assets/popup.html`;

let balanceBefore;

const test = {
    ...signInTest,

    'Open Transfer funds modal': function(browser) {
        getBallance(browser).then(v => balanceBefore = v);

        browser
            .useXpath()
            .click(`//button[contains(text(), 'Transfer funds')]`)
            .useCss()
            .assert.containsText('.action-modal-title', 'Send')
    },

    'Fill send form': function(browser) {
        browser
            .setValue('#send-address', "one1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy")
            .setValue('#amount', TRANSFER_TOKENS)
            .click('.action-modal-group button.button')
            .assert.containsText('.textActive', 'Fees')
            .click('.action-modal-group button.button')
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

    'Go to profile page': function(browser) {
        browser
            .url(TEST_URL + '/portfolio')
    },

    'Check balance after transfer': function(browser) {
        return new Promise((resolve, reject) => {
            let tryCount = 5;

            const checkBalance = (browser) => {
                tryCount--;

                if(!tryCount) {
                    browser.assert.ok(false)
                    reject(new Error('Check balance after transfer is failed'));
                }

                const getNumber = value => Number(value.replace(/,/g, ''));

                getBallance(browser).then(v => {
                    // console.log(111, balanceBefore, v)

                    const expectedBalance = (getNumber(balanceBefore) - TRANSFER_TOKENS);
                    const realBalance = getNumber(v);

                    // console.log(222, expectedBalance, realBalance);

                    if(expectedBalance === realBalance) {
                        browser.assert.ok(true)
                        resolve(browser);
                    } else {
                        setTimeout(() => checkBalance(browser), 1000);
                    }
                })
            };

            checkBalance(browser);
        })
    },

    'Tokens transfer end': function(browser) {
        browser.end();
    }
};

for (let key in test) {
    const originalFunc = test[key];

    test[key] = function (browser) {
        originalFunc(browser);

        browser.saveScreen(key);
    }
}

module.exports = test;

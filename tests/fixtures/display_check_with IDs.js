const TEST_URL = process.env.TEST_URL || 'http://localhost:9080';

console.log('Run test for: ', TEST_URL);

module.exports = {
    '@tags': ['Check all pages for ability to display'],

    'Website is loaded': function(browser) {
        browser
            .url(TEST_URL)
            .waitForElementPresent('.app-header', 4000)
    },

    'Go to Networks page': function(browser) {
        browser.waitForElementPresent('#menu_item_networks', 4000)
        .click('#menu_item_networks');
    },

  'Networks list is loaded and not empty': function(browser) {
    browser.waitForElementPresent('.network-list', 4000)
  },

    'Select "Open Staking Testnet"': function(browser) {
        browser.waitForElementPresent('#network_harmony-open-staking', 4000)
        .click('#network_harmony-open-staking')
    },

    'Go to Validators page': function(browser) {
        browser.waitForElementPresent('#menu_item_validators', 4000)
        .click('#menu_item_validators');
    },

    'Validators list is loaded and not empty': function(browser) {
        browser
            .waitForElementPresent('#validators_table', 10000)
            .waitForElementNotPresent('.tm-data-msg__text', 10000)
            .getText('#validators_table .total-tx-num', function(result) {
                const totalValidators = Number(result.value.split(' ')[0]);
                browser.assert.ok(totalValidators > 0);
            })
    },

    'Validator list show average non-zero stakes': function(browser) {
        browser
            .waitForElementPresent('.average_stake_cell', 4000)
            .elements('css selector', '.average_stake_cell', (res) => {
                res.value.map(e => e.ELEMENT)
                    .forEach(id => {
                        browser.elementIdText(id, result => {
                            browser.assert.ok(parseFloat(result.value.replace(',', '.')) > 0);
                        })
                    })
            })
    },

  'Total stake display and non-zero': function(browser) {
    browser
        .waitForElementNotPresent('.tm-data-msg__text', 4000)
        .waitForElementPresent('#validators_total_stake', 4000)
        .getText('#validators_total_stake', (res) => {
          const totalStake = res.value.split(': ')[1].split('ONE')[0];

          browser.assert.ok(parseFloat(totalStake.replace(',', '.')) > 0);
        })
  },

    'Click to first Validator row': function(browser) {
        browser
            .waitForElementPresent('#validators_table .data-table tbody .li-validator:nth-child(1)', 4000)
            .click('#validators_table .data-table tbody .li-validator:nth-child(1)')
    },

    'Validator page is loaded': function(browser) {
        browser
            .waitForElementNotPresent('.tm-data-msg__text', 10000)
            .waitForElementPresent('.validator-info h2', 4000)
            .getText('.validator-info h2', (res) => {
                browser.assert.equal(res.value.length > 0, true);
            })
            .end();
    }
};

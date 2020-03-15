const TEST_URL = process.env.TEST_URL || 'http://localhost:9080';

console.log('Run test for: ', TEST_URL);

module.exports = {
    tags: ['Check all pages for ability to display'],

    'Main page is loaded': function(browser) {
        browser
            .url(TEST_URL + '/networks')
            .waitForElementPresent('.network-list:nth-child(2)', 2000)
            // .click('.network-list:nth-child(2) .select-network-item:nth-child(2)');
    },

    'Go to Networks page': function(browser) {
        browser
        // .click('.network-list:nth-child(2) .select-network-item:nth-child(2)');
            .waitForElementPresent('.app-menu-item:nth-child(2)', 2000)
            .click('.app-menu-item:nth-child(2)')
    },

  'Networks list is loaded': function(browser) {
    browser
        // .click('.network-list:nth-child(2) .select-network-item:nth-child(2)');
        .waitForElementPresent('.app-menu-item:nth-child(2)', 2000)
        .click('.app-menu-item:nth-child(2)')
  },

    'Networks list contain "Open Staking Testnet"': function(browser) {
        browser
        // .click('.network-list:nth-child(2) .select-network-item:nth-child(2)');
            .waitForElementPresent('.app-menu-item:nth-child(2)', 2000)
            .click('.app-menu-item:nth-child(2)')
    },

    'Go to Validators page': function(browser) {
        browser
        // .click('.network-list:nth-child(2) .select-network-item:nth-child(2)');
            .waitForElementPresent('.app-menu-item:nth-child(2)', 2000)
            .click('.app-menu-item:nth-child(2)')
    },

    'Validators list is loaded': function(browser) {
        browser
        // .click('.network-list:nth-child(2) .select-network-item:nth-child(2)');
            .waitForElementPresent('.app-menu-item:nth-child(2)', 2000)
            .click('.app-menu-item:nth-child(2)')
    },

  '"Total stake" is more than zero': function(browser) {
    browser
        .waitForElementNotPresent('.tm-data-msg__text', 4000)
        .waitForElementPresent('.networkInfo-item h4', 2000)
        .getText('.networkInfo-column .networkInfo-item:nth-child(2)', (res) => {
          browser.assert.equal(res.value.includes('Total stake:'), true);

          const totalStake = res.value.replace('Total stake: ', '').split('ONE')[0];

          browser.assert.equal(parseFloat(totalStake) > 0, false);
        })
  },

    'Click to Validator row': function(browser) {
        browser
            .waitForElementNotPresent('.tm-data-msg__text', 4000)
    },

    'Validator page is loaded': function(browser) {
        browser
            .waitForElementNotPresent('.tm-data-msg__text', 4000)
            .waitForElementPresent('.data-table tbody', 2000)
            .click('.data-table tbody .li-validator:nth-child(1)')
            .waitForElementNotPresent('.tm-data-msg__text', 4000)
            .getText('.validator-info h2', (res) => {
                browser.assert.equal(res.value.length > 0, true);
            })
            .end();
    }

      // .elements('css selector', '.networkInfo-item', (res) => {
      //     res.value.map(e => e.ELEMENT)
      //         .forEach(id => {
      //             browser.elementIdText(id, res => {
      //                 if(res.value.includes('Total stake')){
      //                     console.log(res.value);
      //
      //                     browser.assert.equal(res.value.replace('Total stake:', '').split('ONE')[0] > 0, true);
      //                 }
      //             })
      //         })
      // })

  //   browser.getText('.networkInfo-item h4.second', function(result) {
  //     this.assert.equal(typeof result, 'object');
  //     this.assert.strictEqual(result.status, 0); // only when using Selenium / JSONWire
  //     this.assert.equal(result.value, 'nightwatchjs.org');
  //   });
  // }


  //   'Validators list' : function(browser) {
  //   browser
  //       .url('https://staking.harmony.one/validators')
  //       .waitForElementPresent('.networkInfo-item h4', 2000)
  //       .element('css selector', '.networkInfo-item h4', function(result) {
  //         console.log(result.value)
  //       })
  //       .end();
  // },
};

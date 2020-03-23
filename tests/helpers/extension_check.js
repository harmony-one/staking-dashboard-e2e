const TEST_URL = process.env.TEST_URL || 'http://localhost:9080';

console.log('Run test for: ', TEST_URL);

function getElements(cssSelector) {
    const browser = this;

    return new Promise((resolve, reject) => {
        browser.elements('css selector', cssSelector, res => {
            const elements = res.value.map(e => e.ELEMENT);
            resolve(elements);
        });

        setTimeout(() => {
            browser.assert.ok(false);
            reject('Element not found');
        }, 10000);
    });
}

function getChildTextById(id, cssSelector) {
    const browser = this;

    return new Promise((resolve, reject) => {
        console.log(777, id, cssSelector);

        browser.elementIdElements(id, 'xpath', cssSelector, res => {
            console.log(1111, res);

            browser.elementIdText(res.value[0].ELEMENT, span => {
                resolve(span.value);
            })
        });

        setTimeout(() => {
            browser.assert.ok(false);
            reject('Element not found');
        }, 10000);
    });
}

const account = {
    name: 'test-account',
    password: '1111111111',
    phrase: 'wise category remind orbit short mimic sign adjust siege fossil swear elephant',
}

module.exports = {
    'Open extension': function(browser) {
        getElements = getElements.bind(browser);
        getChildTextById = getChildTextById.bind(browser);

        const url = 'chrome-extension://bmmcdpdpebkojondchooohhanjkldcha/assets/popup.html';

        browser
            .url(url)
            .waitForElementPresent('body', 4000)
            .clickLinkContainingText('Recover account')
            .setValue('input[name=account]', account.name)
            .setValue('input[name=password]', account.password)
            .setValue('input[name=confirm-password]', account.password)
            .setValue('div[name=phrase] textarea', account.phrase)
            .click('button.create-address-btn')
            .waitForElementNotPresent('span.input-error', 4000)
            .assert.containsText('div.account__name', account.name)
            .clickLinkContainingText('Go to Harmony')
            // .waitForElementPresent('li.account', 4000)
            .assert.containsText('h2.session-title', 'Use Harmony Browser Extension')
            // .click('button.account-button')

        // getElements('.input-wrapper').then(elements => {
        //     elements.forEach(id => {
        //         getChildTextById(id, '.input-label').then(text => {
        //             console.log(text);
        //         })
        //     })
        // })

        // browser.elements('css selector', '.input-wrapper', res => {
        //     res.value.map(e => e.ELEMENT).forEach(element => {
        //         browser.elementIdElement(element, 'css selector', 'span', res => {
        //             browser.elementIdText(res.value, span => {
        //                 console.log(span.value);
        //             })
        //         })
        //     })
        // });

            // .setTextToInput('form-input', 'Account Name', 'Recover account');
            // .setTextToInput('form-input', 'Password', 'Recover account');
            // .setTextToInput('form-input', 'Account Name', 'Recover account');
    },
};


// <div class="navItem__text">Recover account</div>

// input-wrapper form-input

module.exports = function (browser, extensionUrl, params, screenshotName) {
    return browser
        .url(extensionUrl)
        .clickLinkContainingText('Recover account')
        .setValue('input[name=account]', params.name)
        .setValue('input[name=password]', params.password)
        .setValue('input[name=confirm-password]', params.password)
        .setValue('div[name=phrase] textarea', params.phrase)
        .saveScreen(screenshotName)
        .click('button.create-address-btn')
        .waitForElementNotPresent('span.input-error', 4000)
        .assert.containsText('div.account__name', params.name)
};

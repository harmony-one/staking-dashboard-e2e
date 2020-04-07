module.exports = function (browser, extensionUrl, params) {
    return browser
        .url(extensionUrl)
        .clickLinkContainingText('Recover account')
        .setValue('input[name=account]', params.name)
        .setValue('input[name=password]', params.password)
        .setValue('input[name=confirm-password]', params.password)
        .useXpath().click(`//*[contains(text(), 'Private key')]`).useCss()
        .setValue('div[name=private-key] textarea', params.privateKey)
};

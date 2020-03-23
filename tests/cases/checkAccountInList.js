const getElementTextAsync = (browser, id) => {
    return new Promise((resolve, reject) => {
        browser.elementIdText(id, res => resolve(res.value));

        setTimeout(() => reject(), 4000);
    });
}

module.exports = function (browser, extensionUrl, params, screenshotName) {
    return browser
        .url(extensionUrl)
        .elements('css selector', 'div.account__name', (res) => {
            return Promise.all(
                res.value
                    .map(e => e.ELEMENT)
                    .map(id => getElementTextAsync(browser, id))
            )
                .then(names => browser.assert.ok(names.some(name => name === params.name)))
        })
        .saveScreen(screenshotName)
};

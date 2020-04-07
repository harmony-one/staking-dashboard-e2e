const getElementTextAsync = (browser, id) => {
    return new Promise((resolve, reject) => {
        browser.elementIdText(id, res => resolve(res.value));

        setTimeout(() => reject(), 4000);
    });
}

module.exports = function (browser) {
    return new Promise((resolve, reject) => {
        browser
            .elements('css selector', '.available-atoms h2', (res) => {
                if(res.value.length){
                    getElementTextAsync(browser, res.value[0].ELEMENT).then( resolve)
                }
            })

        setTimeout(() => reject(), 4000);
    });
};

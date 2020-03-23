require('./env')
const path = require('path');
const fs = require('fs');
var handlebars = require('handlebars');
var recursive = require('recursive-readdir-synchronous');

const TEST_URL = process.env.TEST_URL;
const SELENIUM_HOST = process.env.SELENIUM_HUB_URL;
const SELENIUM_PORT = process.env.SELENIUM_HUB_PORT;
const SCREENSHOT_PATH = process.env.SCREENSHORT_PATH || './reports/screenshots';

module.exports = {
    write : function(results, options, done) {
        let screenshots = [];
        try {
            screenshots = recursive(SCREENSHOT_PATH)
                .map(p => p.replace('reports/', ''))
                .filter(p => p.includes('FAILED'));
        } catch (e) {
            screenshots = [];
        }

        // var reportFilename = options.filename_prefix + (Math.floor(Date.now() / 1000)) + '.html';
        var reportFilename = 'index.html';
        var reportFilePath = path.join(__dirname, options.output_folder, reportFilename);

        // read the html template
        fs.readFile('html-reporter.hbs', function(err, data) {
            if (err) throw err;

            var template = data.toString();

            // merge the template with the test results data
            var html = handlebars.compile(template)({
                results   : results,
                options   : options,
                timestamp : new Date().toString(),
                browser   : options.filename_prefix.split('_').join(' '),
                selenium_url: SELENIUM_HOST + ':' + SELENIUM_PORT,
                website: TEST_URL,
                screenshots
            });

            // write the html to a file
            fs.writeFile(reportFilePath, html, function(err) {
                if (err) throw err;
                console.log('Report generated: ' + reportFilePath);
                done();
            });
        });
    }
};

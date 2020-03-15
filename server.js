require('./env')
const TEST_INTERVAL_SEC = process.env.TEST_INTERVAL_SEC || 120;
const TEST_SERVER_PORT = process.env.TEST_SERVER_PORT || 80;
const SCREENSHOT_PATH = process.env.SCREENSHORT_PATH || './reports/screenshots';

const express = require('express');
var rimraf = require("rimraf");

const child_process = require('child_process');
const exec = child_process.exec;

function execShellCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout? stdout : stderr);
        });
    });
}

async function execTests() {
    console.log('npm run test');
    await execShellCommand('npm run test');

    setTimeout(() => {
        rimraf.sync(SCREENSHOT_PATH);
        execTests();
    }, TEST_INTERVAL_SEC * 1000);
}

// Exec tests & reports
execTests();

// Start express
const app = express();
app.use(express.static('reports'));
app.listen(TEST_SERVER_PORT);

console.log('Server is running on http://localhost:' + TEST_SERVER_PORT);

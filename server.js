require('./env')
const express = require('express');

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

    setTimeout(() => execTests(), 10 * 60 * 1000);
}

// Exec tests & reports
execTests();

// Start express
const app = express();
app.use(express.static('reports'));
app.listen(8080);

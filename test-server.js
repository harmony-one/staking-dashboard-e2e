require('./env')
const express = require('express');
const fs = require('fs');

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

function addTimeToReport() {
    const fd = fs.openSync('./reports/index.html', 'a+');

    const buf = 'Last update time: ' + new Date().toString();

    fs.write(fd, buf, 0 , buf.length, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    fs.close(fd);
}

async function execTests() {
    console.log('npm run test');
    await execShellCommand('npm run test');

    console.log('npm run report');
    await execShellCommand('npm run report');

    addTimeToReport();

    setTimeout(() => execTests(), 30000);
}

// Exec tests & reports
execTests();

// Start express
const app = express();
app.use(express.static('reports'));
app.listen(8080);

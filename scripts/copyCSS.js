/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fse = require('fs-extra');
/* eslint-enable @typescript-eslint/no-var-requires */

const srcDir = path.join(__dirname, '../src/styles');
const distDir = path.join(__dirname, '../dist/js/styles');

let backupFolders = [
    {
        src: srcDir,
        dist: distDir
    }
]

let copyDirs = backupFolders.map(folder => fse.copy(folder.src, folder.dist))
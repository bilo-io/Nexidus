'use strict';

const fs = require('fs');

const pkg = require('../package.json')

console.log(`- writing version.json: ${pkg.version}`)

fs.writeFile('dist/version.json', JSON.stringify({
    version: pkg.version
}, null, 2), (err) => {
    if (err) throw err;
    console.log('- Data written to file dist file');
})

fs.writeFile('src/version.json', JSON.stringify({
    version: pkg.version
}, null, 2), (err) => {
    if (err) throw err;
    console.log('- Data written to file src file');
})


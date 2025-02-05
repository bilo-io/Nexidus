const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

async function getCountryName(code) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/countries?page=<PAGE_NUMBER>
    const pageNumber = 1;
    const apiUrl = `https://jsonmock.hackerrank.com/api/countries?page=${pageNumber}`;
    let result = '';
    // jsonmock.hackerrank.com/api/countries?page=1
    
    const options = {
        hostname: 'jsonmock.hackerrank.com',
        path: '/api/countries',
        method: 'GET'
    }
    
    const request = https.request(options, (res) => {
        let data = '';
        
        res.on('data', chunk => {
            data += chunk;
        }) || [];
        
        res.on('end', () => {
            // console.log();
            const countries = JSON.parse(data).data
            const country = countries?.find?.((c) => c?.alpha2Code === code);
            result = country?.name || '';
            return result;
        });
    })
    
    request.end();
}

async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const code = readLine().trim();

  const name = await getCountryName(code);

  ws.write(`${name}\n`);

}
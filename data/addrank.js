const fs = require('fs');
const { parse } = require('path');

let predata = fs.readFileSync('./2010sFinal.json')
let data = JSON.parse(predata);

data.forEach((d, i) => {
    d.rank = i + 1;
})

fs.writeFileSync('./2010sFinal.json', JSON.stringify(data));
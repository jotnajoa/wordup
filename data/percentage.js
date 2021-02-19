const fs = require('fs');

let predata = fs.readFileSync('./2010sFinal.json');
let data = JSON.parse(predata);

let totalNumber = data.length;
console.log(totalNumber);

let values = [];

data.forEach((d) => {
    values.push(d.frequency)
})

var sum = values.reduce(function(a, b) {
    return a + b;
}, 0);

console.log(sum);
let tenP = Math.floor((totalNumber / 10) * 1);
let twentyP = Math.floor(totalNumber / 5);
console.log(twentyP);
let thirtyP = Math.floor((totalNumber / 10) * 3);

let fortyP = Math.floor((totalNumber / 10) * 4);
let fiftyP = Math.floor((totalNumber / 10) * 5);

let sixtyP = Math.floor((totalNumber / 10) * 6);
let seventyP = Math.floor((totalNumber / 10) * 7);
let eightyP = Math.floor((totalNumber / 10) * 8);
let ninetyP = Math.floor((totalNumber / 10) * 9);

let hundredP = totalNumber.length;

let upTotwenty;

function partial(percentage, values, percentNumber, sum) {
    let partial = [];
    for (let i = 0; i < percentage - 1; i++) {

        partial.push(values[i]);

    }

    let partialSum = partial.reduce(function(a, b) {
        return a + b;
    }, 0);

    let result = { upto: percentNumber, percent: partialSum / sum }
    return result
}


let ten = partial(tenP, values, 10, sum);
let twenty = partial(twentyP, values, 20, sum);
let thirty = partial(thirtyP, values, 30, sum);
let forty = partial(fortyP, values, 40, sum);
let fifty = partial(fiftyP, values, 50, sum);
let sixty = partial(sixtyP, values, 60, sum);
let seventy = partial(seventyP, values, 70, sum);
let eighty = partial(eightyP, values, 80, sum);
let ninety = partial(ninetyP, values, 90, sum);
let hundred = { upto: 100, percent: 1 }

let resultArray = [];
resultArray.push(ten)
resultArray.push(twenty)
resultArray.push(thirty)
resultArray.push(forty)
resultArray.push(fifty)
resultArray.push(sixty)
resultArray.push(seventy)
resultArray.push(eighty)
resultArray.push(ninety)
resultArray.push(hundred)

console.log(resultArray);

fs.writeFileSync('./10coverage.json', JSON.stringify(resultArray))
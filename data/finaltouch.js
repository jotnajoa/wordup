const fs = require('fs');

let returnArray = [];

let predata = fs.readFileSync('./finalData.json');
let data = JSON.parse(predata);

data.forEach((d) => {


    if (d.lyrics.length < 3) {
        null
    } else if (d.lyrics.length < 7 &&
        (d.lyrics.includes('lyrics') || d.lyrics.includes('Lyrics'))) {
        null
    } else {
        let object = {
            lyrics: d.lyrics,
            date: parseInt(d.releaseDate.split('-')[0]),
            songId: d.songId,
            wordcount: d.wordcount
        }

        returnArray.push(object)
    }



})


returnArray.forEach((d) => {

    if (d.date == 993) {
        d.date = 1993
    } else if (d.date == 1969 && d.wordcount == 98) {
        d.date = 2012
    } else if (d.date == 1969 && d.wordcount == 7) {
        d.date = 2011
    } else if (d.date == 1964 && d.wordcount == 45) {
        let index = returnArray.indexOf(d);
        returnArray.splice(index, 1)
    } else if (d.date == 1969 && d.wordcount == 5) {
        d.date = 2015
    } else if (d.date == 1 && d.wordcount == 102) {
        d.date = 2019
    } else if (d.date == 1 && d.wordcount == 239) {
        d.date = 2013
    } else if (d.date == 1 && d.wordcount == 221) {
        d.date = 2013
    }


})

fs.writeFileSync('./data.json', JSON.stringify(returnArray))
import Radiates from './radiates.js'
import Highlight from './highlight.js'

var canvas = document.querySelector('#myCanvas');

if (innerWidth > 1000) {
    canvas.width = innerWidth;
} else {
    canvas.width = 1000;
}
let targetYear;
let target;
window.currentSelect = {
    target: {
        classList: ['', "year80s"]
    }
}
let svgMode = false;
let canvasMode = true;
let svgheight;
let svgwidth;

export function removePlayer() {

    $('.controllbuttons').remove()

}
// removePlayer();
export function recoverPlayer() {
    $('.controllbuttons').remove()
    $('.switch').remove()
    $('.wordDistribution').remove()
    $('wordCoverage').remove()
    $('yearbtn').remove()

    $('.player').append(
        `<div class="controllbuttons">

<div class="iconname">REWIND</div>

<svg class="rewindbutton iconcontainer">
    <path class='rewind icon'd="M0,15 l15,-15 l0,30 Z"
    style="stroke: none;"/>
    <path class='rewind icon'd="M20,15 l15,-15 l0,30 Z"
    style="stroke: none;"/>
</svg>

</div>

<div class="controllbuttons">

<div class="iconname">PLAY/PAUSE</div>

<svg class="playpausebutton iconcontainer">
    <path class='play icon'd="M0,0 l15,15 l-15,15 Z"
    style="stroke: none;"/>
    <rect class='pause icon' width='3' height='30' x='25'>
    </rect>
    <rect class='pause icon' width='3' height='30' x='30'>
    </rect>
</svg>

</div>

<div class="controllbuttons">

<div class="iconname">EJECT</div>

<svg class="ejectbutton iconcontainer">
    <path class='eject icon'd="M20,0 l20,20 l-40,0 Z"
    style="stroke: none;"/>
    <rect class='eject icon'width='40' height=5 y=25>

    </rect>

</svg>

</div>`);
    $('.playingobj').text('Waiting...')


}
export function addButtons() {
    // adding three more buttons
    let iconarray = ['Distribution', 'Word Coverage', `80s`, `90s`, `00s`, `10s`]
    for (let i = 0; i < 6; i++) {
        $('.player').append(`<div class=controllbuttons>
        <div class='iconname'>
            ${iconarray[i]}
        </div>
        
        </div>`)

        if (i == 0 || i == 1) {
            $(`.controllbuttons:eq(${i})`).append(`<div class='switch'></div>`)
            if (i == 0) {
                $(`.switch:eq(${i})`).addClass('wordDistribution')
                $(`.switch:eq(${i})`).on('click', showDistribution)
            } else {
                $(`.switch:eq(${i})`).addClass('wordCoverage')
                $(`.switch:eq(${i})`).on('click', showCoverage)
            }

        } else {
            $(`.controllbuttons:eq(${i})`).append(`<div class='yearbtn year${iconarray[i]}'></div>`)
        }
    }
    $('.playingobj').text(`Dispersion of Words`)
}
// addButtons()

canvas.height = innerHeight * 2 / 3;
let radiates = [];
let highlightes = [];
let count = 0;
let radialData;
window.context = canvas.getContext('2d');
window.totalLength;
window.context = canvas.getContext('2d');
window.linePoints = [];
window.addEventListener('resize', init)



function init() {
    if (innerWidth > 1000) {
        canvas.width = innerWidth;
    } else {
        canvas.width = 1000;
    }
    canvas.height = innerHeight * 2 / 3;
    setTimeout(() => { loadNdraw(currentSelect) }, 500)

    d3.select('.coverChart').remove()
    d3.select('.coverXaxis').remove()
    d3.select('.coverYaxis').remove()
    d3.select('.covergraph').remove()
    d3.select('.coverline').remove()
    d3.select('.Xgrid').remove()
    d3.select('.Ygrid').remove()
    drawCoverage(currentSelect)
}


export async function loadNdraw(e) {
    currentSelect = e;

    radiates = [];
    highlightes = [];
    targetYear = e.target.classList[1]
    target = (targetYear == "year80s") ? '1980sFinal' :
        (targetYear == "year90s") ? '1990sFinal' :
        (targetYear == "year00s") ? '2000sFinal' :
        (targetYear == "year10s") ? '2010sFinal' :
        undefined;
    console.log(target)
    highlightYear(currentSelect)

    radialData = await d3.json(`./data/${target}.json`);

    $('.tenwords').remove()
    for (let i = 0; i < 10; i++) {
        $('.top10wordsbox').append(`<div class='tenwords rank${i+1}'>${radialData[i].value}</div>`)
    }
    let tenwords = d3.selectAll('.tenwords');

    tenwords.each(function(d, i) {
        d3.select(this).on('click', readClass)
    })

    shuffle(radialData)
    let length = radialData.length;

    var radius = innerHeight * 1 / 8;
    var offCenter = { x: canvas.width / 5, y: canvas.height * 0.55 }
    var speed = 0.002;
    var values = [];
    radialData.forEach((d) => {
        values.push(d.frequency)
    })
    window.maxVal = d3.max(values)
    window.minVal = d3.min(values);
    window.linScale = d3.scaleLinear()
        .domain([minVal, maxVal])
        .range([0, radius * 1.2])

    radialData.forEach((d, i) => {

        var radian = (Math.PI * 2 / length) * i;
        var magnitude;
        var rank = d.rank

        magnitude = linScale(d.frequency)
        if (d.frequency > maxVal * 1 / 3) {
            highlightes.push(new Highlight(
                radius * Math.cos(radian),
                radius * Math.sin(radian),
                radius,
                speed,
                magnitude,
                radian,
                offCenter,
                i,
                length
            ))
        }

        let color = 'rgb(247,79,79)'
        radiates.push(new Radiates(
            radius * Math.cos(radian),
            radius * Math.sin(radian),
            radius,
            speed,
            magnitude,
            radian,
            offCenter,
            i,
            length,
            rank,
            color
        ))
    })

    if (innerWidth > 1000) {
        svgheight = innerHeight * 0.6
        svgwidth = innerWidth * 0.4
        $('#mySvg').css('width', `${innerWidth*0.4}px`)
        $('#mySvg').css('height', `${innerHeight*0.6}px`)
    } else {
        svgheight = 500
        svgwidth = 500
        $('#mySvg').css('width', `${500}px`);
        $('#mySvg').css('height', `${500}px`)
    }

    drawCoverage(currentSelect)

}

export function addEvent() {
    $('.yearbtn').on('click', loadNdraw)

    animate()


}

// addEvent();

function animate() {
    requestAnimationFrame(animate)
        // context.fillStyle = 'rgba(255,255,255,0.4)'
        // context.fillRect(0, 0, canvas.width, canvas.height);



    context.clearRect(0, 0, innerWidth, innerHeight);

    radiates.forEach((d) => {
        d.update();
        d.draw();
        // d.drawoutline()
    })

    highlightes.forEach((d) => {
        d.update();
        d.drawoutline()
    })
    count = count + 0.05

    // context.lineWidth = 2;
    // context.strokeStyle = "blue";
    // bzCurve(bezierPoints, 0.05, 1);


}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// function bzCurve(points, f, t) {
//     if (points[0]) {
//         context.beginPath();
//         context.moveTo(points[0].x, points[0].y);


//         var m = 0;
//         var dx1 = 0;
//         var dy1 = 0;
//         let nexP, dx2, dy2;

//         var preP = points[0];
//         for (var i = 1; i < points.length; i++) {
//             var curP = points[i];
//             nexP = points[i + 1];
//             if (nexP) {
//                 m = gradient(preP, nexP);
//                 dx2 = (nexP.x - curP.x) * -f;
//                 dy2 = dx2 * m * t;
//             } else {
//                 dx2 = 0;
//                 dy2 = 0;
//             }
//             context.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
//             dx1 = dx2;
//             dy1 = dy2;
//             preP = curP;
//         }
//         context.stroke();
//     }
// }

// function gradient(a, b) {
//     return (b.y - a.y) / (b.x - a.x);
// }

function readClass(t) {
    let rankread = t.target.classList[1];
    let rank = rankread.replace('rank', '');
    console.log(rank)
    targetHighlight(rank)
    wordHighlight(t)
}

function targetHighlight(rank) {
    radiates.forEach((d, i) => {
        if (d.rank == rank) {
            d.mag0 = 1;
            d.highlight = true;

        } else {
            d.color = 'rgba(247,79,79,0.3)'
            d.highlight = false;

        }

    })
}

function putBack() {

    radiates.forEach((d, i) => {

        d.highlight = false;
        d.color = 'rgb(247,79,79)'

    })
}

function highlightYear(e) {

    $('.yearbtn').removeClass('yearbtnselected')
    $(e.target).addClass('yearbtnselected')
}

function wordHighlight(e) {
    if ($(e.target).hasClass('tenwordsSelected')) {
        $('.tenwords').removeClass('tenwordsSelected')
        putBack()
    } else {
        $('.tenwords').removeClass('tenwordsSelected')
        $(e.target).addClass('tenwordsSelected')
    }

}

function showCoverage(e) {

    $('.wordDistribution').removeClass('switchselected')

    if (!$(e.target).hasClass('switchselected')) {
        $(e.target).addClass('switchselected')
    }

    $('#mySvg').css('display', 'block')
    $('#myCanvas').css('display', 'none')
        // $('.disLegend').css('display', 'none')
    $('.top10').css('display', 'none')

    $('.disLegend').attr("src", "./imgs/coverLegend.png");
    $('.disLegend').css({ 'position': 'relative', 'top': '30px' });

    svgMode = true;
    canvasMode = false;



    // if (innerWidth > 1000) {
    //     $('#mySvg').css('width', `${innerWidth*0.4}px`)
    //     $('#mySvg').css('height', `${innerHeight*0.6}px`)
    // } else {
    //     $('#mySvg').css('width', `${500}px`);
    //     $('#mySvg').css('height', `${500}px`)
    // }

    // drawCoverage(currentSelect)
}

function showDistribution(e) {
    $('.wordCoverage').removeClass('switchselected')
    if (!$(e.target).hasClass('switchselected')) {
        $(e.target).addClass('switchselected')
    }
    $('#mySvg').css('display', 'none')
    $('#myCanvas').css('display', 'block')
        // $('.disLegend').css('display', 'block')
    $('.disLegend').attr("src", "./imgs/disLegend.png");
    $('.disLegend').css({ 'position': 'relative', 'top': '0px' });
    $('.top10').css('display', 'block')
    svgMode = false;
    canvasMode = true;
}

async function drawCoverage(selected) {

    // svg가 none인지 block인지 평가해서


    if (!svgMode) {

        d3.select('.coverChart').remove()
        d3.select('.coverXaxis').remove()
        d3.select('.coverYaxis').remove()
        d3.select('.covergraph').remove()
        d3.select('.coverline').remove()
        d3.select('.Xgrid').remove()
        d3.select('.Ygrid').remove()
        d3.select('.WordChosen').remove()
        d3.select('.WordCovered').remove()


        let yearSelected = selected.target.classList[1];
        let coverSvg = d3.select('#mySvg');

        yearSelected = yearSelected.replace('year', '')
        yearSelected = yearSelected.replace('s', '');
        console.log(yearSelected);

        let coverTarget = `${yearSelected}coverage.json`;

        let coverData = await d3.json(`./data/${coverTarget}`)




        // coverSvg.attr("viewBox", `0 0 ${innerWidth*0.4} ${innerWidth*0.4}`)
        // coverSvg.attr('width', innerWidth * 0.4)
        //     .attr('height', innerWidth * 0.4)
        // let svgwidth = innerWidth * 0.4;
        // let svgheight = innerHeight * 0.6;;
        let margin = {
            top: svgwidth * 0.1,
            bottom: svgwidth * 0.1,
            left: svgwidth * 0.1,
            right: svgwidth * 0.05
        }



        let width = svgwidth - margin.left - margin.right;
        let height = svgheight - margin.top - margin.bottom;

        let grp = coverSvg
            .append("g")
            .attr('class', 'coverChart')
            .attr('transform', `translate(${margin.left}.${margin.top})`)

        // Create scales
        let yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain([0, 1])

        let xScale = d3
            .scaleLinear()
            .range([0, width])
            .domain([0, 100]);


        let coverXaxis = grp.append("g")
            .attr('class', 'coverXaxis')
            .attr('transform', `translate(${margin.left},${height+margin.top})`)
            .call(d3.axisBottom(xScale).tickFormat(x => `${x}`))

        // var x_axis = d3.axisBottom(xScale).ticks(4)


        let coverYaxis = grp.append("g")
            .attr('class', 'coverYaxis')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .call(d3.axisLeft(yScale).tickFormat(y => `${y*100}`));

        // grp.append("path")

        let covergraph = grp.append('g')
            .attr('class', 'covergraph')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        var lineFunc = d3.line()
            .x(function(d) { return xScale(d.upto) })
            .y(function(d) { return yScale(d.percent) })

        coverSvg.append('path')
            .attr('class', 'coverline')
            .attr('d', lineFunc(coverData))
            .attr('fill', 'none')
            .attr('transform', `translate(${margin.left},${margin.top})`);



        coverSvg.append("g")
            .attr("class", "Xgrid")
            .attr("transform", `translate(${margin.left},${height+margin.top})`)
            .call(make_x_gridlines()
                .tickSize(-height)
                .tickFormat("")
            )

        // add the Y gridlines
        coverSvg.append("g")
            .attr("class", "Ygrid")
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .call(make_y_gridlines()
                .tickSize(-width)
                .tickFormat("")
            )

        // Add area
        function make_x_gridlines() {
            return d3.axisBottom(xScale)
                .ticks(10)
        }

        // gridlines in y axis function
        function make_y_gridlines() {
            return d3.axisLeft(yScale)
                .ticks(10)
        }
        let rotate = true;
        let notRotate = !rotate

        addLabel(coverSvg, margin, 'Word Chosen', width, height, notRotate)
        addLabel(coverSvg, margin, 'Word Covered', width, height, rotate)


    } else {

        // d3.select('.coverChart').remove()
        // d3.select('.coverXaxis').remove()
        // d3.select('.coverYaxis').remove()
        // d3.select('.covergraph').remove()
        // d3.select('.Xgrid').remove()
        // d3.select('.Ygrid').remove()

        let yearSelected = selected.target.classList[1];
        let coverSvg = d3.select('#mySvg');

        yearSelected = yearSelected.replace('year', '')
        yearSelected = yearSelected.replace('s', '');
        console.log(yearSelected);

        let coverTarget = `${yearSelected}coverage.json`;

        let coverData = await d3.json(`./data/${coverTarget}`)




        // coverSvg.attr("viewBox", `0 0 ${innerWidth*0.4} ${innerWidth*0.4}`)
        // coverSvg.attr('width', innerWidth * 0.4)
        //     .attr('height', innerWidth * 0.4)

        // let svgwidth = innerWidth * 0.4;
        // let svgheight = innerHeight * 0.6;;
        let margin = {
            top: svgwidth * 0.1,
            bottom: svgwidth * 0.1,
            left: svgwidth * 0.1,
            right: svgwidth * 0.05
        }



        let width = svgwidth - margin.left - margin.right;
        let height = svgheight - margin.top - margin.bottom;

        let grp = coverSvg
            .append("g")
            .attr('class', 'coverChart')
            .attr('transform', `translate(${margin.left}.${margin.top})`)

        // Create scales
        let yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain([0, 1])

        let xScale = d3
            .scaleLinear()
            .range([0, width])
            .domain([0, 100]);


        let coverXaxis = grp.append("g")
            .attr('class', 'coverXaxis')
            .attr('transform', `translate(${margin.left},${height+margin.top})`)
            .call(d3.axisBottom(xScale).tickFormat(x => `${x}`))

        let coverYaxis = grp.append("g")
            .attr('class', 'coverYaxis')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .call(d3.axisLeft(yScale).tickFormat(y => `${y*100}`));

        // grp.append("path")

        let covergraph = grp.append('g')
            .attr('class', 'covergraph')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        var lineFunc = d3.line()
            .x(function(d) { return xScale(d.upto) })
            .y(function(d) { return yScale(d.percent) })

        coverSvg.select('.coverline')
            .transition().duration(1000)
            .style('stroke-width', `2px`)
            .attr('d', lineFunc(coverData))
            .transition().duration(1500)
            .style('stroke-width', `0.5px`)

    }
}

function addLabel(coverSvg, margin, labelName, width, height, rotate) {

    if (rotate) {
        coverSvg.append("text")
            .attr('class', `${labelName.replace(' ','')}`)
            .attr('transform', 'rotate(-90)')
            .attr("y", 0)
            .attr("x", 0 - (height / 2) - margin.left)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(`${labelName} (%)`);
    } else if (!rotate) {
        coverSvg.append("text")
            .attr('class', `${labelName.replace(' ','')}`)
            .attr("y", height + margin.top * 1.4)
            .attr("x", width / 2 + margin.left)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(`${labelName} (%)`);
    }
}


// loadNdraw(currentSelect)
// $('.wordDistribution').addClass('switchselected')
// $('.year80s').addClass('yearbtnselected')
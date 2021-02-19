let tl = gsap.timeline()
let dataTorender;
let width, height, svg, marginbase, margin, xscale, yscale, colorscale, eqData, xaxis, yaxis, yaxisScale, eqGraph, eqBackground, t;
let numOfStep = 15;
let colorStep = 4;
let playTl = gsap.timeline();
let nowreversing = false;

async function byDecades(e) {

    let selectedEra = e.target.classList[1];
    let years;
    let target;
    let lpTarget;

    if (selectedEra == 'eighty') {
        $('.targetDecade').text(`80'`)
        years = d3.range(1980, 1990, 1)
        target = '1980s';
        dataTorender = await recallData(target);
        console.log(dataTorender);
        console.log(years);
        lpTarget = 'lp80s'
    } else if (selectedEra == 'ninety') {
        $('.targetDecade').text(`90'`)
        years = d3.range(1990, 2000, 1)
        target = '1990s';
        dataTorender = await recallData(target);
        console.log(dataTorender);
        console.log(years);
        lpTarget = 'lp90s'
    } else if (selectedEra == 'zero') {
        $('.targetDecade').text(`00'`)
        years = d3.range(2000, 2010, 1);
        target = '2000s';
        dataTorender = await recallData(target);
        console.log(dataTorender);
        console.log(years);
        lpTarget = 'lp00s'
    } else if (selectedEra == 'ten') {
        $('.targetDecade').text(`10'`)
        years = d3.range(2010, 2020, 1);
        target = '2010s';
        dataTorender = await recallData(target);
        console.log(dataTorender);
        console.log(years);
        lpTarget = 'lp10s'
    }

    $('.playingobj').text(`Lyrics of ${target}`)

    let data = await recallData(target);
    let hundred = await getTopHundred(data);
    rollDisc(lpTarget, selectedEra, dataTorender)
}


function recallData(decades) {

    let targetFile = `./data/${decades}Final.json`;
    let targetData = d3.json(`${targetFile}`)
    return targetData

}

function getTopHundred(selected) {
    return new Promise((res, rej) => {

        let topHundred = [];
        for (let i = 0; i < 100; i++) {
            topHundred.push(selected[i])
        };

        res(topHundred)
    })
}

function rollDisc(lpTarget, selectedEra, dataTorender) {
    $('.buttoncontainer').css('pointer-events', 'none')
    $('.notableArtists').remove()
    d3.selectAll('.lp').transition().duration(500).style('opacity', 0)
    d3.selectAll('.pic').each(function(d) {

        if (d3.select(this).attr('class').split(' ')[1] == selectedEra) {
            null
        } else {
            d3.select(this).transition().duration(500).style('opacity', 0)
        }
    })
    tl.to(`.${lpTarget}`, { x: '100%', rotation: -180, opacity: 1, duration: 2 })
        .to(`.${lpTarget}`, { x: '0%', rotation: 0, opacity: 0, duration: 2 })
    d3.selectAll('.pic').style('pointer-events', 'none')
    d3.selectAll('.eraDesc').style('pointer-events', 'none')
    $('body').css('overflow-y', 'hidden')

    transition(dataTorender)
    songImg(selectedEra)
}

export const addEvents = () => {

    d3.selectAll('.pic').on('click', byDecades)
    d3.selectAll('.eraDesc').on('click', byDecades)
}

function transition(dataTorender) {


    /*
    # d3.interpolateGreys(t) <>
    # d3.schemeGreys[k]
*/
    eqData = []
        // 이런것보다는 0-1/3 까지는 return 이렇게
        //1/3부터 2/3까지는 return 이렇게
        // 2/3~는 return 이렇게가 나을듯

    for (let i = 0; i < 100; i++) {
        eqData.push(dataTorender[i])
        eqData[i].group = Math.floor(i / 10)
    }

    shuffle(eqData);

    for (let i = 0; i < 100; i++) {
        eqData[i].group = Math.floor(i / 10)
    }



    initialSetup()


}

function initialSetup() {



    d3.select('.eqXaxis').remove()
    d3.select('.eqYaxis').remove()
    d3.select('.eqGraph').remove()
    d3.select('.eqBackground').remove()

    width = parseInt($('.equalizergraph').css('width').split('px')[0])
    height = parseInt($('.equalizergraph').css('height').split('px')[0]);
    svg = d3.select('.equalizergraph')


    marginbase = d3.min([width, height])

    margin = {
        top: marginbase * 0.2,
        bottom: marginbase * 0.2,
        left: marginbase * 0.2,
        right: marginbase * 0.2
    }



    let threshold = (height - margin.top - margin.bottom) / numOfStep;

    let thresholdMax = (height - margin.top - margin.bottom);

    let thresholdArray = d3.range(0, thresholdMax + threshold, threshold).reverse();



    xscale = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.1)
    yscale = d3.scaleThreshold().range(thresholdArray);
    yaxisScale = d3.scaleBand().range([thresholdMax, 0])
    colorscale = d3.scaleThreshold().range(['#333333', '#666666', '#cccccc', '#FFFFFF'])
        // put three different tone of color for range

    xaxis = svg.append("g").attr("class", "eqXaxis")
        .attr("transform", `translate(${margin.left},${margin.top})`)

    yaxis = svg.append("g").attr("class", "eqYaxis")
        .attr("transform", `translate(0,${margin.top})`)

    eqGraph = svg.append('g').attr('class', 'eqGraph').attr('transform', `translate(${margin.left},${margin.top})`)
    eqBackground = svg.append('g').attr('class', 'eqBackground').attr('transform', `translate(${margin.left},${margin.top})`)
    updateAxis(0)

    $('.buttonheader').animate({ opacity: 0 }, 3000)
    $('.buttoncontainer').animate({ opacity: 0 }, 3000)

    setTimeout(() => {
        $('.equalizer').css('opacity', 1)
        $('.equalizergraph').css('opacity', 1)
        $('.equalizerheader').css('opacity', 1)

    }, 4500)

    setTimeout(() => {

        playTl.to('.equalizer', {
            opacity: 1,
            onComplete: updateAxis.bind(this, 1),
            onReverseComplete: updateAxis.bind(this, 1)

        }).to('.equalizer', {
                duration: 2,
                opacity: 1,
                onComplete: updateAxis.bind(this, 2),
                onReverseComplete: updateAxis.bind(this, 2)
            }

        ).to('.equalizer', {
                duration: 2,
                opacity: 1,
                onComplete: updateAxis.bind(this, 3),
                onReverseComplete: updateAxis.bind(this, 3)
            }

        ).to('.equalizer', {
                duration: 2,
                opacity: 1,
                onComplete: updateAxis.bind(this, 4),
                onReverseComplete: updateAxis.bind(this, 4)
            }

        ).to('.equalizer', {
                duration: 2,
                opacity: 1,
                onComplete: updateAxis.bind(this, 5),
                onReverseComplete: updateAxis.bind(this, 5)
            }

        ).to('.equalizer', {
                duration: 2,
                opacity: 1,
                onComplete: updateAxis.bind(this, 6),
                onReverseComplete: updateAxis.bind(this, 6)
            }

        ).to('.equalizer', {
                duration: 2,
                opacity: 1,
                onComplete: updateAxis.bind(this, 7),
                onReverseComplete: updateAxis.bind(this, 7)
            }

        ).to('.equalizer', {
                duration: 2,
                opacity: 1,
                onComplete: updateAxis.bind(this, 8),
                onReverseComplete: updateAxis.bind(this, 8)
            }

        ).to('.equalizer', {
            duration: 2,
            opacity: 1,
            onComplete: updateAxis.bind(this, 9),
            onReverseComplete: updateAxis.bind(this, 9)
        })
        playTl.play()

        addPlayerFunction(playTl)
    }, 6500)



}

function updateAxis(index) {

    let sourceData = [];
    let freqs = [];

    for (let i = 10 * index; i < 10 * (index + 1); i++) {
        sourceData.push(eqData[i]);
    }
    sourceData.forEach((d) => {
        freqs.push(d.frequency)
    })

    numOfStep;

    let max = d3.max(freqs);
    let gap = max / numOfStep
    let colorGap = max / colorStep;
    let domain = d3.range(0, max + gap, gap);
    let words = sourceData.map(d => d.value)
    let colordomain = d3.range(0, max + colorGap, colorGap);



    xscale.domain(words)
    yscale.domain(domain)
    yaxisScale.domain(domain)
    colorscale.domain(colordomain);

    t = svg.transition()
        .duration(700);

    xaxis.selectAll('text')
        .data(sourceData)
        .join(
            enter => enter.append("text")
            .attr('class', 'eqXaxisText')
            .attr('x', (d) => {
                return (xscale(d.value) + xscale.bandwidth() * 1 / 2)
            })
            .attr('y', (d) => {
                return yscale(0) + 50
            })
            .style('opacity', 0)
            .text(d => d.value)
            .call(enter => enter.transition(t)
                .attr('y', (d) => {
                    return yscale(0)
                })
                .style('opacity', 1)
            ),
            update => update
            .text(d => d.value)
            .attr('x', (d) => {
                return (xscale(d.value) + xscale.bandwidth() * 1 / 2)
            })
            .attr('y', (d) => {
                return yscale(0) + 50
            })
            .style('opacity', 0)
            .call(update => update.transition(t)
                .attr('y', (d) => {
                    return yscale(0)
                })
                .style('opacity', 1)
            ),
            exit => exit
            .call(exit => exit.transition(t)
                .attr('y', (d) => {
                    return yscale(0) - 50
                })
                .style('opacity', 0)
                .remove())
        )



    // 그렇네 yaxis는 sourceData를 iteratethrough하면 안되겠네
    yaxis.selectAll('text')
        .data(domain)
        .join('text')
        .attr('class', 'eqYaxisText')
        .attr('x', (d) => {
            return (xscale(words[0]) + xscale.bandwidth())
        })
        .attr('y', (d) => { return yaxisScale(d) })
        .text((d) => { return Math.floor(d / 10) * 100 })

    updateBars(sourceData);
    if (index == 0) {
        backGround(sourceData)
    }

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

function updateBars(sourceData) {

    let rectOnlyData = [...sourceData];

    rectOnlyData.forEach((d, i) => {
        d.group = i;
    })

    // 몇번째칸에있는지를 알아야되는데
    // d.frequency가 yscale을 봐야한다
    //  let domain = d3.range(0, max + gap, gap); 이렇게 생겨먹었으니까
    //  yscale.domain() 하면 domain의 array가 나온다
    //  위의 어레이에서 d.frequency보다 큰녀석의 index를 찾아서 그 인덱스의 갯수만큼 rect갯수를 정한다
    //  만약에 3이다치면, 3개의 rect를 더하는데, 그 각각의 frequency는 yscale.domain[i]가 되겠구만
    rectOnlyData.forEach((d) => {
        let ydomain = yscale.domain();
        let rectToadd;
        let groupnumber = d.group

        ydomain.forEach((t, i) => {
            if (t >= d.frequency && d.frequency >= ydomain[i - 1]) {
                rectToadd = i
            } else {
                null
            }
        });
        for (let k = 0; k < rectToadd; k++) {
            rectOnlyData.push({
                value: d.value,
                frequency: ydomain[k],
                group: groupnumber
            })

        }
    })


    eqGraph.selectAll('rect')
        .data(rectOnlyData)
        .join(
            enter => enter.append("rect").attr('class', 'eqRect')
            .attr('x', function(d) {
                return xscale(d.value)
            })
            .attr('y', function(d) {
                return yscale(d.frequency)
            })
            .attr('width', xscale.bandwidth())
            .attr('height', yaxisScale.bandwidth())
            .style('fill', function(d) { return colorscale(d.frequency) })
            .attr('transform', `translate(0,${-yaxisScale.bandwidth()})`)
            .style('opacity', 0)
            .call(enter => enter.transition(t)
                .delay(function(d, i) { return (200 * Math.random()) })
                .style('opacity', 1)
            ),
            update => update.attr('x', function(d) {
                return xscale(d.value)
            })
            .attr('y', function(d) { return yscale(d.frequency) })
            .style('fill', function(d) { return colorscale(d.frequency) })
            .style('opacity', 0)
            .call(enter => enter.transition(t)
                .delay(function(d, i) { return (200 * Math.random()) })
                .style('opacity', 1)
            ),
            exit => exit
            .call(exit => exit.transition(t)
                .delay(function(d, i) { return (200 * Math.random()) })
                .style("opacity", 0.2)
                .remove())
        );


    xaxis.attr('transform', `translate(${margin.left},${margin.top+yaxisScale.bandwidth()})`)
    addGlow()
}

function addGlow() {
    // svg.select('defs').remove()
    var defs = svg.append("defs");

    //Filter for the outside glow
    var filter = defs.append("filter")
        .attr("id", "glow")
        .attr('filterUnits', 'userSpaceOnUse')

    filter.append("feGaussianBlur")
        .attr("stdDeviation", "2.5")
        .attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    d3.selectAll(".eqRect")
        .style("filter", "url(#glow)");

    d3.selectAll(".eqBackRect")
        .style("filter", "url(#glow)")

}

function backGround(sourceData) {

    let dummy = [];
    for (let i = 0; i < 10; i++) {
        dummy.push({})
        dummy[i].value = sourceData[i].value
    }


    let backData = [];

    dummy.forEach((d) => {
        let ydomain = yscale.domain();

        for (let k = 0; k < 15; k++) {
            backData.push({
                value: d.value,
                frequency: ydomain[k]
            })

        }
    })



    eqBackground.selectAll('rect')
        .data(backData)
        .join('rect')
        .attr('class', 'eqBackRect')
        .attr('x', function(d) {
            return xscale(d.value)
        })
        .attr('y', function(d) {
            return yscale(d.frequency)
        })
        .attr('width', xscale.bandwidth())
        .attr('height', yaxisScale.bandwidth())
        .style('fill', '#2FAD38')
        .style('fill-opacity', 0.1)
        .attr('transform', `translate(0,${-yaxisScale.bandwidth()})`)

}

function songImg(selectedEra) {
    for (let i = 1; i < 6; i++) {
        $('.artistImgs').append(`<img class = 'notableArtists' src ='./imgs/${selectedEra}${i}.jpg'>`)
    }

}

function addPlayerFunction(timeline) {
    $('.playpausebutton').on('click', () => {
        timeline.paused(!timeline.paused())
        if (nowreversing) {
            timeline.play();
            nowreversing != nowreversing
        }

    })

    $('.rewindbutton').on('click', () => {
        timeline.reverse()
        nowreversing = true;
    })

    $('.ejectbutton').on('click', () => {
        $('.buttonheader').animate({ opacity: 1 }, 1000)
        $('.buttoncontainer').animate({ opacity: 1 }, 1000)
        $('.equalizer').css('opacity', 0)
        $('.equalizergraph').css('opacity', 0)
        $('body').css('overflow-y', 'scroll')
        $('.equalizerheader').css('opacity', 0)
        $('.buttoncontainer').css('pointer-events', 'auto')
        $('.pic').css('pointer-events', 'auto')
        $('.eraDesc').css('pointer-events', 'auto')
        $('.pic').css('opacity', 1)
        $('.playingobj').text('Waiting...')
    })



}
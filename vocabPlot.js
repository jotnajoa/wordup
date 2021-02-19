let data, width, height, svg, marginbase, margin, xscale, yscale, maxcount, yscaleSM, yscaleBG;
let cuttingNumber = 600;

export const vocabPlot = async() => {




    await drawAxis();
    // plotCircle()





}

async function drawAxis() {

    data = await d3.json('./data/data.json')
    width = parseInt($('.distribution').css('width').split('px')[0])
    height = parseInt($('.distribution').css('height').split('px')[0]);
    svg = d3.select('.distribution')


    marginbase = d3.min([width, height])

    let vocab = [];

    data.forEach((d) => {
        vocab.push(parseInt(d.wordcount))
    })

    maxcount = d3.max(vocab);





    margin = {
        top: marginbase * 0.1,
        bottom: marginbase * 0.1,
        left: marginbase * 0.2,
        right: marginbase * 0.2
    }
    graphmargin = margin;



    $('.graphtitle').css('top', `${margin.top/3}px`)

    xscale = d3.scaleLinear()
        .domain([1979, 2022])
        .range([0, width - margin.left - margin.right])

    yscale = d3.scaleLinear()
        .domain([0, maxcount + 200])
        .range([height - margin.top - margin.bottom, 0])




    yscaleSM = d3.scaleLinear()
        .domain([0, cuttingNumber])
        .range([height - margin.top - margin.bottom, (height - margin.top - margin.bottom) * 1 / 6])

    yscaleBG = d3.scaleLinear()
        .domain([cuttingNumber, maxcount + 200])
        .range([yscaleSM(cuttingNumber), 0])

    let xAxis = d3.axisBottom().scale(xscale).ticks(12).tickSizeOuter(0);

    let yAxisSM = d3.axisLeft().scale(yscaleSM).tickSizeOuter(0);

    let yAxisBG = d3.axisLeft().scale(yscaleBG).tickSizeOuter(0).ticks(4)


    svg.append('g').classed('xAxis', true).call(xAxis).attr('transform', `translate(${margin.left},${height-margin.bottom})`)
    svg.append('g').classed('yAxisSM', true).call(yAxisSM).attr('transform', `translate(${margin.left},${margin.top})`)
    svg.append('g').classed('yAxisBG', true).call(yAxisBG).attr('transform', `translate(${margin.left},${margin.top})`)


    // d3.select('.yAxisBG').select('text').remove()
    d3.select('.yAxisSM').select('.tick:last-of-type')
        .select('text')
        .classed('breaklinetext', true)
        .text(`⋯ 700`)


    d3.select('.yAxisBG').select('.domain').remove()
    d3.select('.yAxisSM').select('.domain').remove()


    d3.select('.xAxis')
        .selectAll('text')
        .attr('transform', 'translate(0,10)rotate(-30)')

    svg.append("g")
        .attr("class", "BGgrid")
        .call(make_y_gridlines(yscaleBG, 4)
            .tickSize(-width + margin.left + margin.right)
            .tickFormat("")
        )
        .attr('transform', `translate(${margin.left},${margin.top})`)

    d3.select('.BGgrid').select('.domain').remove()
        // d3.select('.xAxis').select('.domain').remove()

    svg.append("g")
        .attr("class", "SMgrid")
        .call(make_y_gridlines(yscaleSM, 12)
            .tickSize(-width + margin.left + margin.right)
            .tickFormat("")
        )
        .attr('transform', `translate(${margin.left},${margin.top})`)

    d3.select('.SMgrid').select('.domain').remove()

    d3.select('.SMgrid').select('.tick:last-of-type').classed('breakline', true)


}

export const plotCircle = () => {
    d3.select('.yAxisBG').transition().duration(1000).style('opacity', 1)
    d3.select('.BGgrid').transition().duration(1000).style('opacity', 1)

    svg.selectAll('circle').remove()
    let circles = svg.append('g').selectAll('circles')
        .data(data)
        .join('circle')
        .attr('class', d => `year${d.date}`)
        .classed('wordCircle', true)
        .attr('cx', d => xscale(d.date))
        .attr('cy', d => yscale(0))
        .attr('r', 4)
        .style('fill', '#F74F4F')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .style('fill-opacity', 0.1)
        .transition()
        .duration(500)
        .delay((d, i) => { return i * 0.2 })
        .attr('cy', (d) => {
            if (d.wordcount > cuttingNumber) {

                return yscaleBG(d.wordcount)
            } else if (d.wordcount < cuttingNumber) {
                return yscaleSM(d.wordcount)
            }

        })
        .style('fill-opacity', 0.2)
        .attr('r', 2)
    addGlow()
        // .style('fill', (d) => {

    //     if (d.wordcount > restartNumber) {
    //         return '#ffffff'
    //     } else if (d.wordcount < cuttingNumber) {
    //         return '#F74F4F'
    //     }

    // })
}




// gridlines in y axis function
function make_y_gridlines(yscale, num) {
    return d3.axisLeft(yscale)
        .ticks(num)
}



export const leavingQuarter = () => {


    let years = d3.range(1980, 2022, 1);

    years.forEach((t) => {



        let targetYear = d3.selectAll(`.year${t}`);
        let targetYearData = targetYear.data()


        let values = [];
        let twenty;
        let eighty;
        for (let year of targetYearData) {
            values.push(year.wordcount);
        }

        let ascending = values.sort(d3.ascending);
        let numberofEl = ascending.length;
        let twentyper = Math.floor(numberofEl * 0.2);
        let eightyper = Math.floor(numberofEl * 0.8);
        twenty = ascending[twentyper];
        eighty = ascending[eightyper];

        d3.select('.yAxisBG').transition().duration(1000).style('opacity', 0)
        d3.select('.BGgrid').transition().duration(1000).style('opacity', 0)

        targetYear.each(function(t) {


            if (d3.select(this).data()[0].wordcount < twenty || d3.select(this).data()[0].wordcount > eighty) {

                d3.select(this).transition().duration(1000)
                    .style('fill', '#4B4B4B').style('opacity', 0.15)
            } else {
                d3.select(this).transition().duration(1000).style('opacity', 0.4).style('fill', '#4FF75C')
                    .transition().duration(1000).attr('r', 3).on('end', addGlow())
            }

        })

        // Uncaught (in promise) TypeError: years.data is not a function




    })




}

function addGlow() {
    var defs = svg.append("defs");

    //Filter for the outside glow
    var filter = defs.append("filter")
        .attr("id", "glow")
        .attr('filterUnits', 'userSpaceOnUse')

    filter.append("feGaussianBlur")
        .attr("stdDeviation", "4.5")
        .attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    d3.select(".breakline")
        .style("filter", "url(#glow)");
}
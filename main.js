import * as vocabPlot from './vocabPlot.js'
import * as scroll from './scrollcontrol.js'
import * as uniquewords from './uniqueword.js';
import * as disc from './disc.js'

var tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.1 })





let leftmargin = 0.2 * d3.min([parseInt($('.distribution').css('width').split('px')[0]), parseInt($('.distribution').css('height').split('px')[0])])

let tl1 = gsap.timeline();
window.currentSelect = {
    target: {
        classList: ['', "year80s"]
    }
}



window.graphmargin = 0;
tl.fromTo('#light1', {
        opacity: 0.6,
        duration: 0.5,
        rotation: -15,
    }, {
        opacity: 0.3,
        rotation: 0,
        duration: 0.5
    }, 1

)

tl.fromTo('#light3', {
        opacity: 0.6,
        duration: 0.5,
        rotation: 15,
    }, {
        opacity: 0.3,
        rotation: 0,
        duration: 0.5
    }, 1

)

tl.fromTo('#light2', {
        opacity: 0.6,
        rotation: -20,
    }, {
        opacity: 0.3,
        rotation: 0
    }, 2

)

tl.fromTo('#light4', {
        opacity: 0.6,
        rotation: 20,
    }, {
        opacity: 0.3,
        rotation: 0
    }, 2

)

if (window.innerHeight < 1000) {
    window.pageSize = 800;
    $('.backgroundIMG').css('width', `${innerWidth}px`)
} else {
    window.pageSize = window.innerHeight * 0.8
    $('.backgroundIMG').css('width', `${innerWidth}px`)
}


window.contentWidth = 0;

contentWidth = $('.contents').width()
console.log(contentWidth);


$('.contents').css('height', `${pageSize*20}px`)
$('.vinyl').css('top', `${pageSize*2/5}px`)
$('.vinyl').css('left', `${window.innerWidth/2-150}px`)
$('.subTitle').css('top', `${pageSize*1/5}px`)


$('.videocontainer').css('top', `${pageSize*1.5}px`)
$('.videocontainer').css('height', `${pageSize}px`)
$('.videodescription').css('top', `${pageSize*1.6}px`)
$('.videoclip').css('width', `${window.innerWidth}px`)
$('.videocontainer').css('width', `${window.innerWidth}px`)


$('.graphbox').css('top', `${pageSize*6}px`);
$('.graphbox').css('left', `0%`);
$('.graphbox').css('height', `${pageSize*1}px`);
$('.graphtitle').css('left', `${leftmargin}px`)
$('.graphtitle').css('top', `${leftmargin}px`)


$('.methodology').css('top', `${pageSize*11.5}px`)
$('.methodology').css('left', `0%`);
$('.methodology').css('height', `${pageSize*1}px`);

$('.methodTitle').css('left', `${leftmargin}px`)
$('.methodTitle').css('top', `${leftmargin}px`)

$('.makinguniques').css('left', `${leftmargin}px`)

$('.msg1').css('top', `${pageSize*8}px`)
$('.msg2').css('top', `${pageSize*10}px`)

$('.msg2').css('top', `${pageSize*10}px`)
$('.msg3').css('top', `${pageSize*12}px`)
$('.msg4').css('top', `${pageSize*14}px`)

$('.decadeselection').css('top', `${pageSize*16}px`)
$('.decadeselection').css('height', `${pageSize}px`)

$('.lastsummary').css('top', `${pageSize*(19+1/4)}px`)
$('.lastsummary').css('height', `${pageSize}px`)
    // $('.decadeselection').css('height', `${pageSize}px`)

$('.equalizer').css('top', `${pageSize*16}px`)
$('.equzlizer').css('height', `${pageSize}px`)

let uniqueWidth = $('.makinguniques').width()



$('.makinguniques').css('top', `${leftmargin}px`)
$('.uniqueexample').css('top', `${window.innerHeight*0.7}px`).css('left', `90%`)
let boxposition = $('.makinguniques').position()


vocabPlot.vocabPlot()
scroll.scrollcontroll()
uniquewords.addWords();
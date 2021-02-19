import * as vocabPlot from './vocabPlot.js'
import * as scroll from './scrollcontrol.js'
import * as uniquewords from './uniqueword.js';
import * as disc from './disc.js'

var tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.1 })


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
$('.vinyl').css('top', `${pageSize/2}px`)
$('.vinyl').css('left', `${window.innerWidth/2-150}px`)
$('.subTitle').css('top', `${pageSize*1/5}px`)


$('.videocontainer').css('top', `${pageSize*1.5}px`)
$('.videocontainer').css('height', `${pageSize}px`)
$('.videodescription').css('top', `${pageSize*1.6}px`)

$('.graphbox').css('top', `${pageSize*6}px`);
$('.graphbox').css('left', `0%`);
$('.graphbox').css('height', `${pageSize*1}px`);


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



$('.methodology').css('top', `${pageSize*0.05}px`).css('left', `${pageSize*0.3}px`)
$('.makinguniques').css('top', `${pageSize*0.1}px`).css('left', `0px`)
$('.uniqueexample').css('top', `${window.innerHeight*0.7}px`).css('left', `90%`)
let boxposition = $('.makinguniques').position()
console.log(boxposition);
$('.methodTitle').css({
    'width': `${uniqueWidth}px`,
    'left': `${pageSize*0.2}px`
})

vocabPlot.vocabPlot()
scroll.scrollcontroll()
uniquewords.addWords();
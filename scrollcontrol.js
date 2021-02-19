import * as vocabPlot from './vocabPlot.js'
import * as uniquewords from './uniqueword.js';
import * as wordEqualizer from './wordEqualizer.js'
import * as disc from './disc.js'

export const scrollcontroll = () => {
    let newImgwidth = 150
    let tl1 = gsap.timeline();

    tl1.to('.videoclip', {
        scrollTrigger: {
            trigger: '.videocontainer',
            scrub: true,
            start: 'center center',
            end: `+=${pageSize*2}px top`,
            pin: '.videoclip',
            onEnter: () => {
                $('.pjtHeader').animate({ 'opacity': 1 }, 1000)
                $('.headerBox').animate({ 'opacity': 1 }, 1000)
                console.log('calling once');
                $('.vinyl').animate({ 'top': `${window.innerHeight*0.8}` }, 1000)

                $('.vinyl').css('width', `${newImgwidth+newImgwidth/2}px`)

                $('.vinyl').css('animation', 'recordTransition 1.5s')

                setTimeout(() => {
                    $('.vinyl').css('animation', 'turntable 1s infinite linear')
                }, 1500)

                setTimeout(() => { $('.vinyl').css('transform', 'translate(0,100px)') }, 2000)
            },
            onLeave: () => {
                $('body').css('overflow-x', 'hidden')
            },
            onEnterBack: () => {
                $('body').css('overflow-x', 'scroll')
            },
            onLeaveBack: () => {
                $('.pjtHeader').animate({ 'opacity': 0 }, 1000)
                $('.headerBox').animate({ 'opacity': 0 }, 1000)
            }
        },
        opacity: 0.4,

    })

    tl1.to('.firstsong', {
        scrollTrigger: {
            trigger: '.videocontainer',
            scrub: true,
            start: 'center center',
            end: `+=${pageSize*2}px top`,
            pin: '.firstsong',
            onLeave: () => { $('.firstong').css('opacity', 0) },
            onEnterBack: () => { $('.firstong').css('opacity', 1) }
        },
        opacity: 1,
    })

    tl1.to('.videodescription', {
        scrollTrigger: {
            trigger: '.videocontainer',
            scrub: true,
            start: 'center center',
            end: `+=${pageSize*2}px top`,
            pin: '.videodescription'
        },
        opacity: 1,
    })





    tl1.to('.distribution', {
        scrollTrigger: {
            trigger: '.graphbox',
            scrub: true,
            start: `top+=${pageSize*0.45}px center`,
            end: `top+=${pageSize*6}px top`,
            pin: '.distribution',
            onEnter: () => {
                $('.distribution').animate({ opacity: 1 }, 1000)
                $('.graphtitle').animate({ opacity: 1 }, 1000)
            }
        }
    })

    tl1.to('.graphtitle', {
        scrollTrigger: {
            trigger: '.graphbox',
            scrub: true,
            start: 'center center',
            end: `+=${pageSize*6}px top`,
            pin: '.graphtitle',
            onEnter: () => {
                $('.backgroundIMG').css('visibility', 'visible')
            },
            onEnterBack: () => {
                $('.backgroundIMG').css('visibility', 'visible')
            },
            onLeaveBack: () => {
                $('.backgroundIMG').css('visibility', 'hidden')
            }
        }
    })

    tl1.to('.msg1', {
        scrollTrigger: {
            trigger: '.msg1',
            start: 'center center',
            pin: '.msg1',
            onEnter: () => {
                vocabPlot.plotCircle()
            }
        }
    })

    tl1.to('.msg2', {
        scrollTrigger: {
            trigger: '.msg2',
            scrub: true,
            start: 'center center',
            pin: '.msg2',
            onEnter: () => {
                vocabPlot.leavingQuarter()
            },
            onLeave: () => {
                $('.distribution').animate({ opacity: 0 }, 1000);
                $('.graphtitle').animate({ opacity: 0 }, 1000)
                $('.methodology').animate({ opacity: 1 }, 1000)
            },
            onEnterBack: () => {
                $('.distribution').animate({ opacity: 1 }, 1000)
                $('.graphtitle').animate({ opacity: 1 }, 1000)
                $('.methodology').animate({ opacity: 0 }, 1000)
            }
        }
    })

    tl1.to('.msg3', {
        scrollTrigger: {
            trigger: '.msg3',
            start: 'center center',
            pin: '.msg3',
            onEnter: () => {
                uniquewords.highlightwords();
                wordEqualizer.addEvents();
            }
        }
    })

    tl1.to('.msg4', {
        scrollTrigger: {
            trigger: '.msg4',
            start: 'center center',
            pin: '.msg4',
            onEnter: () => {
                uniquewords.removeDuplicates()
            },
            onLeave: () => {
                $('.methodology').css('position', 'relative');
                $('body').css('overflow-x', 'hidden')
            },
            onEnterBack: () => {
                $('.methodology').css('position', 'fixed');
                $('body').css('overflow-x', 'auto')
            },

        }
    })

    tl1.to('.decadeselection', {
        scrollTrigger: {
            trigger: '.decadeselection',
            start: 'center center+=120',
            pin: '.decadeselection',
            onEnter: () => {
                $('.decadeselection').animate({ opacity: 1 }, 1000)
                $('.player').animate({ opacity: 1 }, 1000)
                $('.vinyl').animate({ opacity: 0 }, 500)
            },
            onLeave: () => {
                $('.decadeselection').animate({ opacity: 0 }, 1000)
                $('.player').animate({ opacity: 0 }, 1000)
            },
            onEnterBack: () => {
                $('.decadeselection').animate({ opacity: 1 }, 1000)
                $('.player').animate({ opacity: 1 }, 1000)
            },
            onLeaveBack: () => {
                $('.decadeselection').animate({ opacity: 0 }, 1000)
                $('.player').animate({ opacity: 0 }, 1000)
                $('.vinyl').animate({ opacity: 1 }, 500)
            },
        }
    })





    tl1.to('.equalizer', {
        scrollTrigger: {
            trigger: '.decadeselection',
            start: 'center center+=120',
            pin: '.equalizer',
        }
    })



    tl1.to('.lastsummary', {
        scrollTrigger: {
            trigger: '.lastsummary',
            start: `top top`,
            pin: '.lastsummary',
            onEnter: () => {

                $('.player').css({
                    'bottom': '10%',
                    'grid-template-columns': 'auto',
                    'grid-auto-flow': 'column'
                })
                $('.controllbuttons').css({
                    'display': 'grid',
                    'grid-auto-flow': 'row'
                })


                $('.lastsummary').animate({ opacity: 1 }, 1000)
                disc.removePlayer();
                disc.addButtons();
                disc.addEvent();
                $('.player').css('opacity', 1)

                disc.loadNdraw(currentSelect)
                $('.wordDistribution').addClass('switchselected')
                $('.year80s').addClass('yearbtnselected')
            },
            onLeaveBack: () => {
                $('.lastsummary').animate({ opacity: 0 }, 1000)
                $('.player').css('opacity', 0),
                    disc.recoverPlayer();


                $('.player').css({
                    'bottom': '5%',
                    'grid-template-columns': '5fr 1fr 1fr 1fr',
                    'grid-auto-flow': 'column'
                })
                $('.controllbuttons').css({
                    'width': '100%',
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center',
                    'flex-direction': 'column'
                })



            },
            onLeave: () => {
                // lastsummary 꺼지고 , player꺼진다
                $('.lastsummary').css('opacity', 0)
                $('.player').css('opacity', 0)
            },
            onEnterBack: () => {

                disc.removePlayer();
                disc.addButtons();
                disc.addEvent();

                $('.player').css({
                    'bottom': '10%',
                    'grid-template-columns': 'auto',
                    'grid-auto-flow': 'column'
                })
                $('.controllbuttons').css({
                    'display': 'grid',
                    'grid-auto-flow': 'row'
                })

                $('.lastsummary').css('opacity', 1)
                $('.player').css('opacity', 1)



            }
        }
    })



}
let lyricsBase, lyricstrim, lyrics, uniques, wordEl
export const addWords = () => {

    lyricsBase = `Straight outta Compton!
Crazy motherfucker named Ice Cube
From the gang called Niggas Wit Attitudes
When I'm called off I got a sawed-off
Squeeze the trigger and bodies are hauled off
You too boy if you fuck with me
The police are gonna have to come and get me
Off your ass that's how I'm going out
For the punk motherfuckers that's showing out
Niggas start to mumble they wanna rumble
Mix 'em and cook 'em in a pot like gumbo
Going off on the motherfucker like that
With a gat that's pointed at your ass
So give it up smooth
Ain't no telling when I'm down for a jack move
Here's a murder rap to keep y'all dancin'
With a crime record like Charles Manson`;

    lyricstrim = lyricsBase.replace(/(\r\n|\n|\r)/gm, " ");
    lyrics = lyricstrim.replace(/\\n/gm, ' ')
    lyrics = lyrics.split(' ');
    uniques = [];
    $('.makinguniques').css('height', `${window.innerHeight*0.5}px`)
    console.log(lyrics);

    lyrics.forEach((d, i) => {
        $('.makinguniques').append(`<div class='words'>${d}</div>`)
        $('.totalcount').text(`${lyrics.length}`)
    })

    lyrics.forEach((d) => {
        if (!uniques.includes(d)) {
            uniques.push(d)
        }
    })

    console.log(uniques);

    wordEl = Array.from($('.words'));

}


export const highlightwords = () => {

    wordEl.forEach(function(d, i) {

        if (uniques.includes(d.innerHTML)) {
            d.classList.add("unique");
            uniques.splice(d, 1)
        } else {
            setTimeout(() => { d.classList.add('fadeaway') }, 20 * i)
        }

    })
}


export const removeDuplicates = () => {

    let tobeDeleted = Array.from($('.fadeaway'));
    tobeDeleted.forEach((d, i) => {
        setTimeout(() => { d.remove() }, i * 150)
    })

    let Cont = { val: lyrics.length };
    let newVal = $('.unique').length

    let tl = gsap.timeline()
    tl.to(Cont, 5, {
        val: newVal,
        roundProps: "val",
        onUpdate: function() {
            document.querySelector(".totalcount").innerHTML = `${Cont.val.toLocaleString()}`
        }
    }).to('.wordcount>p', 1, {
        onUpdate: function() {
            document.querySelector('.wordcount > p').innerHTML = `Unique Word Count:${newVal}`
        }
    })

}
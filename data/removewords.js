const fs = require('fs');

// for the first round it missed many things for some reason so I repeat the cycle over and over

let predata = fs.readFileSync('./1980sFinal.json');
let data = JSON.parse(predata);

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


let pronoun=[
    'I', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'he','him', 'his','himself',
'she', 'her', 'hers', 'herself',
'it','its','itself',
'we', 'us', 'our', 'ours', 'ourselves',
'they','them','their','theirs','themselves',
'this','that','these','those'
];

let Pronoun=pronoun.map(t=>capitalize(t))

let preposition=[
     'aboard' , 'about' , 'above' , 'across' , 'after' , 'against' , 'along' , 'amid' , 'among' , 'anti' , 'around' , 'as' , 'at' , 'before', 
     'behind' , 'below' , 'beneath' , 'beside' , 'besides' , 'between' , 'beyond' , 'but' , 'by' , 'concerning' , 'considering' , 'despite' , 
     'down' , 'during' , 'except' , 'excepting' , 'excluding' , 'following' , 'for' , 'from' , 'in' , 'inside' , 'into' , 'like' , 'minus' , 'near' , 
     'of' , 'off' , 'on' , 'onto' , 'opposite' , 'outside' , 'over' , 'past' , 'per' , 'plus' , 'regarding' , 'round' , 'save' , 'since' , 'than' , 
     'through' , 'to' , 'toward' , 'towards' , 'under' , 'underneath' , 'unlike' , 'until' , 'up' , 'upon' , 'versus' , 'via' , 'with' , 'within' , 
     'without'
];
let Preposition = preposition.map(t=>capitalize(t))

let conjunction=[
    'for', 'and', 'nor', 'but', 'or', 'yet','so','because','although','whereas',
'besides','unlike','therefore','provided','unless','since','so','if','yet','after'
];
let Conjunction = conjunction.map(t=>capitalize(t))

let beverb = ['am','was','are','were','is','was','be','been']
let Beverb = beverb.map(t=>capitalize(t))

let article=['a','the','an'];
let Article = article.map(t=>capitalize(t))


remove();

async function remove(){
    let result = await removeWords();
    fs.writeFileSync('./1980sFinal.json',JSON.stringify(data))

}

function removeWords(){
return new Promise((res,rej)=>{
data.forEach((d)=>{

    pronoun.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            data.splice(index,1)
        }else{null}
    })

    Pronoun.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            data.splice(index,1)
        }else{null}
    })

    preposition.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            console.log(data.splice(index,1))
        }else{null}
    })

    Preposition.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            data.splice(index,1)
        }else{null}
    })

    conjunction.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            data.splice(index,1)
        }else{null}
    })

    Conjunction.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            data.splice(index,1)
        }else{null}
    })

    article.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            data.splice(index,1)
        }else{null}
    })

    Article.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            data.splice(index,1)
        }else{null}
    })

    beverb.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            data.splice(index,1)
        }else{null}
    })

    Beverb.forEach((t)=>{
        if(d.value==t){
            let index = data.indexOf(d);
            data.splice(index,1)
        }else{null}
    })
})
    res(data)
})



}



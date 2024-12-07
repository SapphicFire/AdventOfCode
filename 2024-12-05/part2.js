const file = '2024-12-05/example1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\r\n');

/*
    Rules:
    - Check if a set of numbers is in order
    - File starts with a bunch of rules in the format X|Y - number Y must come after number X
    - File then lists the set of numbers and we need to validate that they pass all the rules or they don't
    
    - Find the ones that are invalid and fix them
    - Grab the middle number in each corrected set and sum them
*/ 

let rules = {}, sets = [], invalidSets = [], sum = 0;

const processRules = (documentArr) => {
    for(var i = 0; i < documentArr.indexOf(''); i++){
        let rule = documentArr[i].split('|');
        if(rules[rule[0]] instanceof Array){
            rules[rule[0]].push(+rule[1]);
        } else {
            rules[rule[0]] = [];
            rules[rule[0]].push(+rule[1]);
        }
    }
}

const checkArray = (array) => {
    let isValid = true;
    for(var j = 1; j < array.length; j++){
        if(rules[array[j]] == undefined){
            continue;
        }
        let checkArr = array.slice(0,j);
        for(var k = 0; k < rules[array[j]].length; k++){
            if(checkArr.indexOf(rules[array[j]][k]) > -1){
                isValid = false;
                break;
            }
        }
    }

    return !isValid;
}

const kahnsSort = (array) => {
    let sorter = [], queue = [], inDeg = {}, graphRules = {};

    for(let page of array){
        inDeg[page] = 0;
        graphRules[page] = [];
    }

    for(let page of array){
        if(rules[page] != undefined){
            for(let i = 0; i < rules[page].length; i++){
                if(array.indexOf(rules[page][i]) > -1){
                    inDeg[rules[page][i]]++;
                    graphRules[page].push(rules[page][i]);
                }
            }
        }
    }

    for(let page of array){
        if(inDeg[page] == 0){
            queue.push(page);
        }
    }
    
    // Troubleshoot queue not being printed
    while (queue.length > 0) {
        let curPage = queue.shift();
        sorter.push(curPage);
        for (let path of graphRules[curPage]) {
            inDeg[path]--;
            if (inDeg[path] === 0) {
                queue.push(path);
            }
        }
    }

    return queue;
}

processRules(inputArr);

sets = inputArr.slice(inputArr.indexOf('') + 1);
sets = sets.map((set) => set.split(',').map((el) => +el));

invalidSets = sets.filter((row) => {
    return checkArray(row);
});

invalidSets.forEach((set) => {
    console.log('Pre-sort: ' + set);
    console.log('Post-sort: ' + kahnsSort(set));

    let index = (set.length - 1) / 2;
    sum += set[index];
})

console.log('S:\t' + JSON.stringify(sets));
console.log('VS:\t' + JSON.stringify(invalidSets));
console.log('Sum:\t' + sum);
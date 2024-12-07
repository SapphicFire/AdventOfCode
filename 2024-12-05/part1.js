const file = '2024-12-05/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\r\n');

/*
    Rules:
    - Check if a set of numbers is in order
    - File starts with a bunch of rules in the format X|Y - number Y must come after number X
    - File then lists the set of numbers and we need to validate that they pass all the rules or they don't
    
    - Grab the middle number in each valid set and sum them
*/ 

let rules = {}, sets = [], validSets = [], sum = 0;

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

    return isValid;
}

processRules(inputArr);

sets = inputArr.slice(inputArr.indexOf('') + 1);
sets = sets.map((set) => set.split(',').map((el) => +el));

validSets = sets.filter((row) => {
    return checkArray(row);
});

validSets.forEach((set) => {
    let index = (set.length - 1) / 2;
    sum += set[index];
})

console.log('S:\t' + JSON.stringify(sets));
console.log('VS:\t' + JSON.stringify(validSets));
console.log('Sum:\t' + sum);
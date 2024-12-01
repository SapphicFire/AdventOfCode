const file = '2023-12-04/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.replaceAll('Card   ','').replaceAll('Card  ','').replaceAll('Card ','').replaceAll(': ',':').replaceAll(' |  ','|').replaceAll(' | ','|').replaceAll('  ',' ').replaceAll(' ',',').split('\n');

/*
    Rules:
    - Format is winning numbers | my numbers
    - 1 point for first match, each additional match is 2x
    Goal:
    - Sum of all cards
*/ 

/* Functions */
const convertArrtoNumArr = input => input.map((item) => Number(item));
const getWinningNumbers = line => convertArrtoNumArr(line.substring(line.indexOf(':') + 1,line.indexOf('|')).split(','));
const getMyNumbers = line => convertArrtoNumArr(line.substring(line.indexOf('|') + 1).trim().split(','));
const getCountMatching = (winning,mine) => {
    let count = 0;
    mine.forEach(num => {
        winning.indexOf(num) > -1 ? count++ : null;
    });
    return count;
}


/* Executions */
let sum = 0;

inputArr.forEach(row => {
    let outcome = 0;
    let matches = getCountMatching(getWinningNumbers(row),getMyNumbers(row));
    if(matches > 0){
        outcome = 1;
        for(let i = 1; i < matches; i++){
            outcome = outcome * 2;
        }
    }
    sum += outcome;
});

console.log('Sum:' + sum)
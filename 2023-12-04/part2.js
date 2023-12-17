const file = '2023-12-04/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.replaceAll('Card   ','').replaceAll('Card  ','').replaceAll('Card ','').replaceAll(': ',':').replaceAll(' |  ','|').replaceAll(' | ','|').replaceAll('  ',' ').replaceAll(' ',',').split('\n');

/*
    Rules:
    - Format is winning numbers | my numbers
    - You win 1 each of the following n cards where n is the number of matches
    - This stacks alongside existing
    Goal:
    - Count of all cards
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
let cardArr = Array(inputArr.length).fill(1);

inputArr.forEach((row,cardNum) => {
    let matches = getCountMatching(getWinningNumbers(row),getMyNumbers(row));
    if(matches > 0){
        for(let j = 0; j < cardArr[cardNum]; j++){
            for(let i = 1; i <= matches; i++){
                let newIndex = cardNum + i;
                cardArr.length > newIndex ? cardArr[newIndex]++ : console.log('Too far!');
            }
        }
    }
});

let sum = cardArr.reduce((acc,cur) => acc + cur, 0);
console.log('Sum: ' + sum);
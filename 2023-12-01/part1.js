const file = '2023-12-01/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\n');

let sum = 0;

for(let i in inputArr){
    let regex = /\d/g;
    let numArr = inputArr[i].match(regex);
    if(numArr !== null){
        let digits = '' + numArr[0] + numArr[numArr.length - 1];
        console.log('Digits: ' + digits);
        sum += parseInt(digits);
    }
    console.log('Sum: ' + sum);
}
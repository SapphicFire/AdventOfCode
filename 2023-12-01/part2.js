const file = '2023-12-01/input2.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\n');
let spelledArr = ['one','two','three','four','five','six','seven','eight','nine'];

let sum = 0;

for(let i in inputArr){
    let regex = /one|two|three|four|five|six|seven|eight|nine|\d/g;
    let numArr = inputArr[i].match(regex);
    if(numArr !== null){
        if(/\D/g.test(numArr[0])){
            numArr[0] = spelledArr.indexOf(numArr[0]) + 1;
        }
        if(/\D/g.test(numArr[numArr.length - 1])){
            numArr[numArr.length - 1] = spelledArr.indexOf(numArr[numArr.length - 1]) + 1;
        }
        let digits = '' + numArr[0] + numArr[numArr.length - 1];
        sum += parseInt(digits);
    }
}
console.log('Sum: ' + sum);
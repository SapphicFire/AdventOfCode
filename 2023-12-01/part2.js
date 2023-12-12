const file = '2023-12-01/input2.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\n');
let spelledArr = ['one','two','three','four','five','six','seven','eight','nine'];

let sum = 0;
let digits = 0;
let current, numArr;

for(let i = 0; i < inputArr.length; i++){
    let regex = /one|two|three|four|five|six|seven|eight|nine|\d/g;
    numArr = [];
    digits = 0;
    while(current = regex.exec(inputArr[i])){
        numArr.push(current[0]);
        regex.lastIndex = current.index + 1;
    }
    console.log(numArr)
    if(numArr !== null){
        if(/\D/g.test(numArr[0])){
            numArr[0] = spelledArr.indexOf(numArr[0]) + 1;
        }
        if(/\D/g.test(numArr[numArr.length - 1])){
            numArr[numArr.length - 1] = spelledArr.indexOf(numArr[numArr.length - 1]) + 1;
        }
        digits = '' + numArr[0] + numArr[numArr.length - 1];
        sum += parseInt(digits);
    }
}
console.log('Sum: ' + sum);
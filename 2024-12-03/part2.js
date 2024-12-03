const file = '2024-12-03/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\r\n');

/*
    Rules:
    - The goal of the program is just to multiply some numbers
    - Instructions are in the format mul(X,Y), where X and Y are each 1-3 digit numbers
    - There are also many invalid characters that should be ignored, even if they look like part of a mul instruction. Sequences like mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 ) do nothing.
    - The do() instruction enables future mul instructions.
    - The don't() instruction disables future mul instructions.
    - Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.
*/ 

const multiple = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
let total = 0, results = [], enabled = true;

for(var i = 0; i < inputArr.length; i++){
    results = inputArr[i].match(multiple);
    if(results != null){
        results.forEach((match) => {
            if(match.startsWith('do')){
                enabled = match == 'do()' ? true : false;
            } else {
                match = match.replace('mul(','').replace(')','').split(',').map((val) => +val);
                if(enabled){
                    total += (match[0] * match[1]);
                }
            }
        });
    }
}

console.log('Total is: ' + total);
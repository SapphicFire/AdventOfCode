const file = '2023-12-02/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.replaceAll(/Game\s/g,'').replaceAll(/\sred/g,'r').replaceAll(/\sgreen/g,'g').replaceAll(/\sblue/g,'b').split('\n');

let sum = 0;
let current;
let regex = /\d{1,2}(r|b|g)/g

/*
    Rules: Valid games only have:
    - 12 red cubes
    - 13 green cubes
    - 14 blue cubes
*/ 

for(let i in inputArr){
    let power = 0;
    let number = 0;
    let max = {};
    max.red = 0;
    max.green = 0;
    max.blue = 0;
    let letter = '';
    while(current = regex.exec(inputArr[i])){
        number = parseInt(current[0].split(/\D/)[0]);
        letter = current[0].replace(/\d*/g,'');
        switch(letter){
            case 'r':
                if(number > max.red) max.red = number;
                break;
            case 'b':
                if(number > max.blue) max.blue = number;
                break;
            case 'g':
                if(number > max.green) max.green = number;
                break;
            default:
                console.log('What did that elf just grab out of their bag?!');
        }
    }
    power = max.red * max.green * max.blue;
    if(max.red == 0 || max.green == 0 || max.blue == 0) console.log('Zero ahoy');
    sum += power;
}
console.log('Sum: ' + sum);
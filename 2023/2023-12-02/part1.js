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
    let valid = true;
    let number = 0;
    let letter = '';
    while(current = regex.exec(inputArr[i])){
        number = parseInt(current[0].split(/\D/)[0]);
        letter = current[0].replace(/\d*/g,'');
        switch(letter){
            case 'r':
                if(number > 12) valid = false;
                break;
            case 'b':
                if(number > 14) valid = false;
                break;
            case 'g':
                if(number > 13) valid = false;
                break;
            default:
                console.log('What did that elf just grab out of their bag?!');
        }
    }
    if(valid) sum += parseInt(i) + 1;
}
console.log('Sum: ' + sum);
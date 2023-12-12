const file = '2023-12-02/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.replaceAll(/Game\s/g,'').replaceAll(/\sred/g,'r').replaceAll(/\sgreen/g,'g').replaceAll(/\sblue/g,'b').split('\n');

let sum = 0;
let current;
let regex = /\d{2}(r|b|g)/g

/*
    Rules: Valid games only have:
    - 12 red cubes
    - 13 green cubes
    - 14 blue cubes
*/ 

for(let i in inputArr){
    let valid = true;
    while(current = regex.exec(inputArr[i])){
        switch(current[0][current[0].length]){
            case 'r':
                break;
            case 'b':
                break;
            case 'g':
                if(parseInt(current[0]))
                break;
            default:
                console.log('What did that elf just grab out of their bag?!');
        }
        console.log(current[0])
    }
    let colours = {};
    colours.red = [];
    colours.green = [];
    colours.blue = [];

    if(i == 5) break;
}
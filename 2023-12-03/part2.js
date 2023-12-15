const file = '2023-12-03/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\n');

/*
    Rules:
    - Outcome is sum of all gear 'ratios'
    - A gear is an * with exactly 2 neighbouring numbers
    - A gear ratio is the result of multiplying those together
    - Checking each cardinal and intercardinal
        ...
        .x.
        ...
*/

/* Functions */

const getNumber = (coordinates, engine) => {
    let stringedNum = '';
    let x = coordinates[0];

    // Find start
    while(isANumber(engine[coordinates[1]][x])){
        x--;
    }

    x++; // Index will be one shy of where we need to be
    while(isANumber(engine[coordinates[1]][x])){
        stringedNum += engine[coordinates[1]][x];
        engine[coordinates[1]][x] = '.'; // Avoid double-ups
        x++;
    }
    
    return parseInt(stringedNum);
};

// Check functions
const isANumber = inputChar => /\d/.test(inputChar);
const isASymbol = inputChar => inputChar === '*';
const isValidCoord = (coordinates, engine) => Object.hasOwn(engine,coordinates[1]) && Object.hasOwn(engine[coordinates[1]],coordinates[0]);
const checkNeighbours = ([x, y], engine, neighbourFunc) => {
    if(isValidCoord([x,y-1] /*North*/,engine) && isANumber(engine[y-1][x])) {neighbourFunc([x,y-1],engine)}
    if(isValidCoord([x+1,y-1] /*North East*/,engine) && isANumber(engine[y-1][x+1])) {neighbourFunc([x+1,y-1],engine)}
    if(isValidCoord([x+1,y] /*East*/,engine) && isANumber(engine[y][x+1])) {neighbourFunc([x+1,y],engine)}
    if(isValidCoord([x+1,y+1] /*South East*/,engine) && isANumber(engine[y+1][x+1])) {neighbourFunc([x+1,y+1],engine)}
    if(isValidCoord([x,y+1] /*South*/,engine) && isANumber(engine[y+1][x])) {neighbourFunc([x,y+1],engine)}
    if(isValidCoord([x-1,y+1] /*South West*/,engine) && isANumber(engine[y+1][x-1])) {neighbourFunc([x-1,y+1],engine)}
    if(isValidCoord([x-1,y] /*West*/,engine) && isANumber(engine[y][x-1])) {neighbourFunc([x-1,y],engine)}
    if(isValidCoord([x-1,y-1] /*North West*/,engine) && isANumber(engine[y-1][x-1])) {neighbourFunc([x-1,y-1],engine)}
};

/* Execution */
let gearRatios = [];
let sum = 0;
const engine2D = inputArr.map((row) => row.split(''));

// Iterate over each column in each row
// If we find a symbol, look for a number
engine2D.forEach(
    (row, y, engine) => row.forEach(
        (colChar,x,row2) => {
            if(isASymbol(colChar)){
                let partNums = [];
                checkNeighbours([x,y],engine,([x,y],engine) => {
                    let part = getNumber([x,y],engine);
                    if(!isNaN(part)){
                        console.log(part)
                        partNums.push(part);
                    }
                });
                if(partNums.length == 2){
                    gearRatios.push(partNums[0] * partNums[1]);
                }
            }
        }
    )
);

sum = gearRatios.reduce((acc,cur) => acc + cur,0);
console.log('Sum: ' + sum);
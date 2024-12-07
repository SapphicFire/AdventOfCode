const file = '2024-12-04/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\r\n');

/*
    Hello there, Day 3 Part 2 from 2023 with extra steps!

    Rules:
    - The goal of this one is ~extra suffering~ counting the times X-MAS is found
    - X-MAS is created by two MAS on diagonals with A as the center
    - This word search allows MAS to be written backwards or forwards and to overlap other instances
*/

let startChar = 'A', desiredWord = 'MAS', desiredWordRev = 'SAM', count = 0;

const isAMatch = (startY, startX) => {
    if (checkPath(+startY, +startX)){
        count++;
    }
};

// Add second level check for crossed MAS
const checkPath = (originY, originX) => {
    let instance = '', matches = 0;

    // First MAS 
    instance = inputArr[originY - 1][originX - 1 /*North West*/] + startChar + inputArr[originY + 1][originX + 1 /*South East*/];
    if(instance == desiredWord || instance == desiredWordRev){
        matches++;
    }
    instance = '';

    // Second MAS
    instance = inputArr[originY + 1][originX - 1 /*North East*/] + startChar + inputArr[originY - 1][originX + 1 /*South West*/];
    if(instance == desiredWord || instance == desiredWordRev){
        matches++;
    }
    if (matches == 2) {
        return true;
    }
    return false;
}

for (var row = 1; row < (inputArr.length - 1); row++) {
    for (var col = 1; col < (inputArr[row].length - 1); col++) {
        if (inputArr[row][col] == startChar) {
            isAMatch(row, col);
        }
    }
}

console.log('Total count of X-' + desiredWord + ': ' + count);
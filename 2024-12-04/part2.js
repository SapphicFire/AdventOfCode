const file = '2024-12-03/input1.txt';
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

let startChar = 'X', desiredWord = 'MAS', count = 0;

const validCoordBounds = {
    origin: 0,
    maxY: inputArr.length - 1,
    maxX: inputArr[0].length - 1
}

// rework directions permitted
const validDirections = [
    [-1, -1] /*North West*/, [0, -1] /*North*/, [1, -1] /*North East*/,
    [-1, 0] /*West*/, [1, 0] /*East*/,
    [-1, 1] /*South West*/, [0, 1] /*South*/, [1, 1] /*South East*/
];

const checkWord = (startX, startY) => {
    for (let [x, y] of validDirections) {
        if (checkPath(+startX, +startY, x, y)) count++;
    }
};

// Add second level check for crossed MAS
const checkPath = (originX, originY, directionX, directionY) => {
    let instance = '' + startChar;
    for (var i = 1; i < desiredWord.length; i++) {
        const nextX = originY + (i * directionY);
        const nextY = originX + (i * directionX);
        if (nextX < validCoordBounds.origin || nextX > validCoordBounds.maxX || nextY < validCoordBounds.origin || nextY > validCoordBounds.maxY) {
            continue;
        }
        instance += inputArr[nextY][nextX];
    }

    if (instance == desiredWord) {
        return true;
    }
    return false;
}

for (var row = 0; row < inputArr.length; row++) {
    for (var col = 0; col < inputArr[row].length; col++) {
        if (inputArr[row][col] == startChar) {
            if (checkWord(row, col)) count++;
        }
    }
}

console.log('Total count of ' + desiredWord + ': ' + count);
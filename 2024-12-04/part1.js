const file = '2024-12-04/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\r\n');

/*
    Hello there, Day 3 from 2023 with extra steps!

    Rules:
    - The goal of this one is ~suffering~ counting the times XMAS can be matched in a bit of text
    - This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words
*/

let startChar = 'X', desiredWord = 'XMAS', count = 0;

const validCoordBounds = {
    origin: 0,
    maxY: inputArr.length - 1,
    maxX: inputArr[0].length - 1
}

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
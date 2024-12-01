const file = '2024-12-01/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\r\n');

/*
    Rules:
    - Work out distance between smallest number in each array
    - Sum distances
*/ 

const quickSortFunc = (array) => {
    if(array.length <= 1){
        return array;
    }

    let pivotNum = array[0], smallerArr = [], largerArr = [];

    for(let i = 1; i < array.length; i++){
        if(array[i] < pivotNum){
            smallerArr.push(array[i]);
        } else {
            largerArr.push(array[i]);
        }
    }

    return [...quickSortFunc(smallerArr), pivotNum, ...quickSortFunc(largerArr)]
}

let firstIdArr = [], secondIdArr = [], distance = 0;

for(let i of inputArr){
    firstIdArr.push(+i.split('   ')[0]);
    secondIdArr.push(+i.split('   ')[1]);
}

firstIdArr = quickSortFunc(firstIdArr);
secondIdArr = quickSortFunc(secondIdArr);

for(let j = 0; j < firstIdArr.length; j++){
    distance += Math.abs(firstIdArr[j] - secondIdArr[j]);
}

console.log('Value: ' + distance);
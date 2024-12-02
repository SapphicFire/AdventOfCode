const file = '2024-12-02/input1.txt';
const fs = require('fs');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\r\n');

/*
    Rules:
    - The unusual data (your puzzle input) consists of many reports, one report per line. Each report is a list of numbers called levels that are separated by spaces
        - Columns are levels
        - Rows are reports
    - Reports are safe if they gradually increase or decrease
        - The levels are either all increasing or all decreasing.
        - Any two adjacent levels differ by at least one and at most three
        - If 1 level can be removed to make safe, it counts as safe
*/ 

let reports = [], temp, count = 0;

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

const isSafeReport = (report, isDampened) => {
    console.log(report);
    let isDesc = false, isAsc = false, isSafe = true, dampened = [], diff = 0;

    // Check direction
    isDesc = (report.toString() == quickSortFunc(report).reverse().toString()) ? true : false;
    if(!isDesc){
        isAsc = (report.toString() == quickSortFunc(report).toString()) ? true : false;
    }

    if(!isDesc && !isAsc){
        isSafe = false;
    }

    for(var j = 1; j < report.length; j++){
        diff = Math.abs(report[j] - report[j-1]);
        if(diff < 1 || diff > 3){
            isSafe = false;
        }
    }

    if(!isSafe && !isDampened){
        for(var k = 0; k < report.length; k++){
            dampened = [...report];
            dampened.splice(k,1);
            if(isSafeReport(dampened,true)){
                isSafe = true;
            }
        }
    }

    return isSafe;
}

inputArr.forEach((rep) => {
    temp = rep.split(' ');
    reports.push(temp.map((val) => +val));
    temp = null;
});

reports.forEach((report) => {
    console.log('Next rec:');
    if(isSafeReport(report, false)){
        count++;
    }
});

console.log('Safe report count: ' + count);
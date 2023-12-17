const file = '2023-12-05/example1.txt';
const fs = require('fs');
const { setMaxIdleHTTPParsers } = require('http');
let inputContent = fs.readFileSync(file, 'utf-8');
let inputArr = inputContent.split('\n');

/*
    Rules:
    - Columns are:
        - Destination range start (second word)
        - Source range start (first word)
        - Range length
    - Unmapped sources correspond to same destination
    Goal:
    - Convert each seed through soil, fert, water, light, temp, humid, to location
*/ 

const getSeeds = row => {
    let seedRegex = /^seeds:(?<seeds> (\d* ?)*)/;
    return seedRegex.exec(row).groups.seeds.trim().split(' ').map((val) => Number(val));
};
const getMaps = input => {
    let maps = {};
    let mapRegex = /^(?<from>\w*)-to-(?<to>\w*) map:/gm;
    let current;

    while(current = mapRegex.exec(input)){
        maps[current.groups.to] = {};
        maps[current.groups.to].previous = current.groups.from
        maps[current.groups.to].values = null;
        maps[current.groups.to].previousValues = null;

        let numbersStart = mapRegex.lastIndex + 2;
        let mapLines = input.substring(numbersStart,input.indexOf('\r\n',numbersStart)).split('\n');
        mapLines.forEach((line, lineNum) => mapLines[lineNum] = line.split(' '));
        console.log(mapLines)
        console.log('---');
    }
    console.log(maps)
}

console.log(getSeeds(inputArr[0]))
getMaps(inputContent)
const fs = require('fs');

const input = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\02\\input.txt', 'utf-8');

let numbers = input.split(',').map(n => parseInt(n, 10));

// Preprocess
numbers[1] = 12;
numbers[2] = 2;

function process(startAtIndex) {
    if (numbers[startAtIndex] === 99) {
        
    }

    const firstNum = numbers[numbers[startAtIndex + 1]];
    const secondNum = numbers[numbers[startAtIndex + 2]];

    let thirdNum;
    if (numbers[startAtIndex] === 1) {
        thirdNum = firstNum + secondNum;
    }

    if (numbers[startAtIndex] === 2) {
        thirdNum = firstNum * secondNum;
    }
    numbers[numbers[startAtIndex + 3]] = thirdNum;
}

for(let i = 0; i < numbers.length; i += 4) {
    if (numbers[i] === 99) {
        break;
    }
    process(i);
}

console.log(numbers);
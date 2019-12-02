const fs = require('fs');

const input = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\02\\input.txt', 'utf-8');

const parsedInput = input.split(',').map(n => parseInt(n, 10));

function calculate(numbers, noun, verb) {
    // Preprocess
    numbers[1] = noun;
    numbers[2] = verb;

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

    for (let i = 0; i < numbers.length; i += 4) {
        if (numbers[i] === 99) {
            break;
        }
        process(i);
    }

    return numbers;
}

for (var n = 0; n <= 99; n++) {
    for (var v = 0; v <= 99; v++) {
        const [o] = calculate([...parsedInput], n, v)

        if (o === 19690720) {
            console.log(n, v);
        }
    }
}
const fs = require('fs');

const input = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\05\\input.txt', 'utf-8');

let numbers = input.split(',').map(n => parseInt(n, 10));
// numbers = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]
// numbers = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];
// numbers = [3, 3, 1108, -1, 8, 3, 4, 3, 99];

const OPC = {
    ADD: 1,
    MULT: 2,
    INP: 3,
    OUT: 4,
    JUMP_IF_TRUE: 5,
    JUMP_IF_FALSE: 6,
    LESS_THAN: 7,
    EQUALS: 8,
};
const PARAM_MODES = {
    POS: 0,
    IMM: 1,
};

function process(operationCode, firstParamIndex, firstParamMode, secondParamMode) {
    const firstNum = getParamValue(firstParamMode, numbers[firstParamIndex]);
    const secondNum = getParamValue(secondParamMode, numbers[firstParamIndex + 1]);

    let thirdNum;
    if (operationCode === OPC.ADD) {
        thirdNum = firstNum + secondNum;
    }

    if (operationCode === OPC.MULT) {
        thirdNum = firstNum * secondNum;
    }

    numbers[numbers[firstParamIndex + 2]] = thirdNum;
}

function getParamValue(mode, param) {
    if (mode === PARAM_MODES.IMM) {
        return param;
    }

    return numbers[param];
}

function getParamMode(operationAsString, index) {
    const n = Number(operationAsString[operationAsString.length - 2 - index]);

    return Number.isNaN(n) ? 0 : n;
}


let i = 0;
while (i < numbers.length) {
    console.log(i);
    // if (numbers[i] === 99) {
    //     break;
    // }
    console.log(numbers);

    const operationCode = numbers[i] % 100;

    const operationAsString = `${numbers[i]}`;
    const firstParamMode = getParamMode(operationAsString, 1);
    const secondParamMode = getParamMode(operationAsString, 2);
    const thirdParamMode = getParamMode(operationAsString, 3);


    let amountOfParams;

    console.log(operationCode, firstParamMode, secondParamMode, thirdParamMode);

    if (operationCode === OPC.ADD || operationCode === OPC.MULT) {
        amountOfParams = 3;

        process(operationCode, i + 1, firstParamMode, secondParamMode);
    }

    if (operationCode === OPC.INP) {
        amountOfParams = 1;

        numbers[numbers[i + 1]] = 5;
    }
    if (operationCode === OPC.OUT) {
        amountOfParams = 1;

        console.log('OUTPUT', numbers[numbers[i + 1]]);
    }
    if (operationCode === OPC.JUMP_IF_TRUE) {
        amountOfParams = 2;

        const firstParam = getParamValue(firstParamMode, numbers[i + 1]);
        const secondParam = getParamValue(secondParamMode, numbers[i + 2]);

        // console.log(firstParam, firstParamMode, secondParam, secondParamMode);
        if (firstParam) {
            i = secondParam;
            // console.log('setting i as ', secondParam);
            continue;
        }
    }
    if (operationCode === OPC.JUMP_IF_FALSE) {
        amountOfParams = 2;

        const firstParam = getParamValue(firstParamMode, numbers[i + 1]);
        const secondParam = getParamValue(secondParamMode, numbers[i + 2]);

        if (!firstParam) {
            i = secondParam;
            continue;
        }
    }
    if (operationCode === OPC.LESS_THAN) {
        amountOfParams = 3;

        const firstParam = getParamValue(firstParamMode, numbers[i + 1]);
        const secondParam = getParamValue(secondParamMode, numbers[i + 2]);

        numbers[numbers[i + 3]] = firstParam < secondParam ? 1 : 0;
    }
    if (operationCode === OPC.EQUALS) {
        amountOfParams = 3;

        const firstParam = getParamValue(firstParamMode, numbers[i + 1]);
        const secondParam = getParamValue(secondParamMode, numbers[i + 2]);

        numbers[numbers[i + 3]] = firstParam === secondParam ? 1 : 0;
    }

    i += amountOfParams + 1;
}

console.log(numbers);
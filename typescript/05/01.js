const fs = require('fs');

const input = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\05\\input.txt', 'utf-8');

let numbers = input.split(',').map(n => parseInt(n, 10));

const OPC = {
    ADD: 1,
    MULT: 2,
    INP: 3,
    OUT: 4,
};
const PARAM_MODES = {
    POS: 0,
    IMM: 1,
};

function process(operationCode, firstParamIndex, firstParamMode, secondParamMode) {
    const firstNum = getParam(firstParamMode, numbers[firstParamIndex]);
    const secondNum = getParam(secondParamMode, numbers[firstParamIndex + 1]);

    let thirdNum;
    if (operationCode === OPC.ADD) {
        thirdNum = firstNum + secondNum;
    }

    if (operationCode === OPC.MULT) {
        thirdNum = firstNum * secondNum;
    }
    numbers[numbers[firstParamIndex + 2]] = thirdNum;
}

function getParam(mode, param) {
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
while(i < numbers.length) {
    // console.log(i);
    // if (numbers[i] === 99) {
    //     break;
    // }

    const operationCode = numbers[i] % 100;

    const operationAsString = `${numbers[i]}`;
    const firstParameterMode = getParamMode(operationAsString, 1);
    const secondParamMode = getParamMode(operationAsString, 2);
    const thirdParamMode = getParamMode(operationAsString, 3);


    let amountOfParams;

    // console.log(operationCode, firstParameterMode, secondParamMode, thirdParamMode);

    if (operationCode === OPC.ADD || operationCode === OPC.MULT) {
        amountOfParams = 3;

        process(operationCode, i+1, firstParameterMode, secondParamMode);
    }

    if (operationCode === OPC.INP) {
        amountOfParams = 1;

        numbers[numbers[i + 1]] = 1;
    }
    if (operationCode === OPC.OUT) {
        amountOfParams = 1;

        console.log('OUTPUT', numbers[numbers[i + 1]]); 
    }

    i += amountOfParams + 1;
}

console.log(numbers);
const OPC = {
    ADD: 1,
    MULT: 2,
    INP: 3,
    OUT: 4,
    JUMP_IF_TRUE: 5,
    JUMP_IF_FALSE: 6,
    LESS_THAN: 7,
    EQUALS: 8,
    REL_BASE_OFFSET: 9,
    EXIT: 99,
};
const PARAM_MODES = {
    POS: 0,
    IMM: 1,
    REL: 2,
};
function getParamValue(mode, param, numbers, relativeBase) {
    if (mode === PARAM_MODES.REL) {
        return numbers[relativeBase + param] || 0;
    }
    if (mode === PARAM_MODES.IMM) {
        return param || 0;
    }
    return numbers[param] || 0;
}
function getParamMode(operationAsString, index) {
    const n = Number(operationAsString[operationAsString.length - 2 - index]);
    return Number.isNaN(n) ? 0 : n;
}
module.exports = function createAmp(numbers) {
    let i = 0;
    let iterations = 0;
    let relativeBase = 0;
    return function intCode(inputSignal) {
        while (true) {
            const operationCode = numbers[i] % 100;
            iterations += 1;
            // if (iterations % 10000 === 0) {
            //   console.log('INTCODE', iterations);
            // }
            const operationAsString = `${numbers[i]}`;
            const firstParamMode = getParamMode(operationAsString, 1);
            const secondParamMode = getParamMode(operationAsString, 2);
            const firstParam = getParamValue(firstParamMode, numbers[i + 1], numbers, relativeBase);
            const secondParam = getParamValue(secondParamMode, numbers[i + 2], numbers, relativeBase);
            function setParam(paramIndex, value) {
                let indexToSet = numbers[i + paramIndex] || 0;
                if (getParamMode(operationAsString, paramIndex) === PARAM_MODES.REL) {
                    indexToSet += relativeBase;
                }
                numbers[indexToSet] = value;
            }
            let amountOfParams;
            switch (operationCode) {
                case OPC.ADD:
                    amountOfParams = 3;
                    setParam(amountOfParams, firstParam + secondParam);
                    break;
                case OPC.MULT:
                    amountOfParams = 3;
                    setParam(amountOfParams, firstParam * secondParam);
                    break;
                case OPC.INP:
                    amountOfParams = 1;
                    setParam(amountOfParams, inputSignal);
                    break;
                case OPC.OUT:
                    amountOfParams = 1;
                    i += amountOfParams + 1;
                    return firstParam;
                case OPC.JUMP_IF_TRUE:
                    amountOfParams = 2;
                    if (firstParam) {
                        i = secondParam;
                        continue;
                    }
                    break;
                case OPC.JUMP_IF_FALSE:
                    amountOfParams = 2;
                    if (!firstParam) {
                        i = secondParam;
                        continue;
                    }
                    break;
                case OPC.LESS_THAN:
                    amountOfParams = 3;
                    setParam(amountOfParams, firstParam < secondParam ? 1 : 0);
                    break;
                case OPC.EQUALS:
                    amountOfParams = 3;
                    setParam(amountOfParams, firstParam === secondParam ? 1 : 0);
                    break;
                case OPC.REL_BASE_OFFSET:
                    amountOfParams = 1;
                    relativeBase += firstParam;
                    break;
                case OPC.EXIT:
                    return null;
                default:
                    console.error('Unknown op code');
            }
            i += amountOfParams + 1;
        }
    };
};

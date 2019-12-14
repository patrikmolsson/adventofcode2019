var OPC = {
    ADD: 1,
    MULT: 2,
    INP: 3,
    OUT: 4,
    JUMP_IF_TRUE: 5,
    JUMP_IF_FALSE: 6,
    LESS_THAN: 7,
    EQUALS: 8,
    REL_BASE_OFFSET: 9,
    EXIT: 99
};
var PARAM_MODES = {
    POS: 0,
    IMM: 1,
    REL: 2
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
    var n = Number(operationAsString[operationAsString.length - 2 - index]);
    return Number.isNaN(n) ? 0 : n;
}
module.exports = function createAmp(numbers) {
    var i = 0;
    var relativeBase = 0;
    return function intCode(inputSignal) {
        var _loop_1 = function () {
            var operationCode = numbers[i] % 100;
            var operationAsString = "" + numbers[i];
            var firstParamMode = getParamMode(operationAsString, 1);
            var secondParamMode = getParamMode(operationAsString, 2);
            var firstParam = getParamValue(firstParamMode, numbers[i + 1], numbers, relativeBase);
            var secondParam = getParamValue(secondParamMode, numbers[i + 2], numbers, relativeBase);
            function setParam(paramIndex, value) {
                var indexToSet = numbers[i + paramIndex] || 0;
                if (getParamMode(operationAsString, paramIndex) === PARAM_MODES.REL) {
                    indexToSet += relativeBase;
                }
                numbers[indexToSet] = value;
            }
            var amountOfParams = void 0;
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
                    return { value: firstParam };
                case OPC.JUMP_IF_TRUE:
                    amountOfParams = 2;
                    if (firstParam) {
                        i = secondParam;
                        return "continue";
                    }
                    break;
                case OPC.JUMP_IF_FALSE:
                    amountOfParams = 2;
                    if (!firstParam) {
                        i = secondParam;
                        return "continue";
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
                case OPC.EXIT: return { value: null };
                default:
                    console.error('Unknown op code');
            }
            i += amountOfParams + 1;
        };
        while (true) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
};

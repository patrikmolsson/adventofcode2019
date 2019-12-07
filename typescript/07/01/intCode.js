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

function getParamValue(mode, param, numbers) {
  if (mode === PARAM_MODES.IMM) {
    return param;
  }

  return numbers[param];
}

function getParamMode(operationAsString, index) {
  const n = Number(operationAsString[operationAsString.length - 2 - index]);

  return Number.isNaN(n) ? 0 : n;
}


module.exports = function intCode(phaseSetting, inputSignal, numbers) {
  let usedPhaseSetting = false;
  let i = 0;
  while (i < numbers.length) {
    const operationCode = numbers[i] % 100;

    const operationAsString = `${numbers[i]}`;
    const firstParamMode = getParamMode(operationAsString, 1);
    const secondParamMode = getParamMode(operationAsString, 2);
    const firstParam = getParamValue(firstParamMode, numbers[i + 1], numbers);
    const secondParam = getParamValue(secondParamMode, numbers[i + 2], numbers);

    let amountOfParams;

    switch (operationCode) {
      case OPC.ADD:
        amountOfParams = 3;
        numbers[numbers[i + amountOfParams]] = firstParam + secondParam;
        break;
      case OPC.MULT:
        amountOfParams = 3;
        numbers[numbers[i + amountOfParams]] = firstParam * secondParam;
        break;
      case OPC.INP:
        amountOfParams = 1;

        numbers[numbers[i + amountOfParams]] = usedPhaseSetting ? inputSignal : phaseSetting;
        usedPhaseSetting = true;
        break;
      case OPC.OUT:
        amountOfParams = 1;

        return numbers[numbers[i + amountOfParams]];
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
        numbers[numbers[i + amountOfParams]] = firstParam < secondParam ? 1 : 0;
        break;
      case OPC.EQUALS:
        amountOfParams = 3;

        numbers[numbers[i + amountOfParams]] = firstParam === secondParam ? 1 : 0;
        break;
      default:
        console.error('Unknown op code');
    }
    i += amountOfParams + 1;
  }
};


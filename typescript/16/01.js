const pattern = [0, 1, 0, -1];
function getFactorFromPattern(inputSignalIndex, outputSignalIndex) {
    let i = 0;
    i += Math.floor(((inputSignalIndex + 1) / (outputSignalIndex + 1)));
    i += pattern.length;
    i %= pattern.length;
    return pattern[i];
}
function sum(acc, curr) {
    return acc + curr;
}
function concat(acc, curr) {
    return `${acc}${curr}`;
}
function calculateOutputAtIndex(input, outputSignalIndex) {
    const s = Array
        .from(input)
        .map(Number)
        .map((d, i) => d * getFactorFromPattern(i, outputSignalIndex))
        .reduce(sum);
    return Math.abs(s % 10);
}
function calculateOutput(input) {
    return Array
        .from(input)
        .map((_, i) => calculateOutputAtIndex(input, i))
        .reduce(concat, '');
}
// let input = '12345678';
// let input = '80871224585914546619083218645595';
// let input = '19617804207202209144916044189917';
// let input = '69317163492948606335995924319873';
let input = '59713137269801099632654181286233935219811755500455380934770765569131734596763695509279561685788856471420060118738307712184666979727705799202164390635688439701763288535574113283975613430058332890215685102656193056939765590473237031584326028162831872694742473094498692690926378560215065112055277042957192884484736885085776095601258138827407479864966595805684283736114104361200511149403415264005242802552220930514486188661282691447267079869746222193563352374541269431531666903127492467446100184447658357579189070698707540721959527692466414290626633017164810627099243281653139996025661993610763947987942741831185002756364249992028050315704531567916821944';
const maxPhases = 100;
for (let phase = 0; phase <= maxPhases; phase += 1) {
    console.log('After', phase, 'phases', input);
    input = calculateOutput(input);
}

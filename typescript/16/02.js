function sum(acc, curr) {
    return acc + curr;
}
function calculateOutput(input) {
    let lastSum = input.split('').map(d => Number(d)).reduce(sum, 0);
    let output = '';
    let lastDigit;
    for (const char of input.split('')) {
        // console.log(char, lastSum, lastDigit, output);
        if (lastDigit) {
            lastSum -= lastDigit;
        }
        lastDigit = Number(char);
        output = `${output}${Math.abs(lastSum % 10)}`;
    }
    return output;
}
// let input = '12345678';
// let input = '80871224585914546619083218645595';
// let input = '19617804207202209144916044189917';
// let input = '69317163492948606335995924319873';
// const rawInput = '03036732577212944063491565474664';
// const rawInput = '02935109699940807407585447034323';
//   320 000
//   303 673
// =  16 327
const rawInput = '59713137269801099632654181286233935219811755500455380934770765569131734596763695509279561685788856471420060118738307712184666979727705799202164390635688439701763288535574113283975613430058332890215685102656193056939765590473237031584326028162831872694742473094498692690926378560215065112055277042957192884484736885085776095601258138827407479864966595805684283736114104361200511149403415264005242802552220930514486188661282691447267079869746222193563352374541269431531666903127492467446100184447658357579189070698707540721959527692466414290626633017164810627099243281653139996025661993610763947987942741831185002756364249992028050315704531567916821944';
// 650 * 10 000
const n = Number(rawInput.slice(0, 7));
// console.log('constructing array with n', n);
const multipliedArray = Array(10000).fill(null).reduce(acc => `${acc}${rawInput}`, '');
const slicedArray = multipliedArray.slice(n);
// console.log('constructed array. Length', slicedArray.length, 'prev length', multipliedArray.length);
const maxPhases = 100;
let tempInput = slicedArray;
for (let phase = 1; phase <= maxPhases; phase += 1) {
    tempInput = calculateOutput(tempInput);
    console.log('phase', phase);
}
console.log(tempInput.slice(0, 8));

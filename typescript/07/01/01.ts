const fs = require('fs');
const intCode = require('./intCode');
let highestOutput = Number.MIN_SAFE_INTEGER;
let highestSignal = '';
// const numbers = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
// const numbers = [3,23,3,24,1002,24,10,24,1002,23,-1,23, 101,5,23,23,1,24,23,23,4,23,99,0,0];
// const numbers = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
//   1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
// const numbers = [3,8,1001,8,10,8,105,1,0,0,21,38,63,80,105,118,199,280,361,442,99999,3,9,102,5,9,9,1001,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,4,9,102,4,9,9,101,4,9,9,102,2,9,9,101,2,9,9,4,9,99,3,9,1001,9,5,9,102,4,9,9,1001,9,4,9,4,9,99,3,9,101,3,9,9,1002,9,5,9,101,3,9,9,102,5,9,9,101,3,9,9,4,9,99,3,9,1002,9,2,9,1001,9,4,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,99];
const input = fs.readFileSync('C:\\Users\\paolsson\\Development\\adventofcode2019\\typescript\\07\\input.txt', 'utf-8');
const numbers = input.split(',').map(n => parseInt(n, 10));

for (let p1 = 0; p1 < 5; p1 += 1) {
  for (let p2 = 0; p2 < 5; p2 += 1) {
    if (p1 === p2) {
      continue;
    }
    for (let p3 = 0; p3 < 5; p3 += 1) {
      if (p1 === p3 || p2 === p3) {
        continue;
      }
      for (let p4 = 0; p4 < 5; p4 += 1) {
        if (p1 === p4 || p2 === p4 || p3 === p4) {
          continue;
        }
        for (let p5 = 0; p5 < 5; p5 += 1) {
          if (p1 === p5 || p2 === p5 || p3 === p5 || p4 === p5) {
            continue;
          }

          doRun(p1, p2, p3, p4, p5);
        }
      }
    }
  }
}

function doRun(...p: Number[]) {
  let lastOutput = 0;
  for (let amp = 0; amp < 5; amp += 1) {
    lastOutput = intCode(p[amp], lastOutput, [...numbers]);
  }

  if (lastOutput > highestOutput) {
    highestSignal = `${p[0]}${p[1]}${p[2]}${p[3]}${p[4]}`;
    highestOutput = lastOutput
  }
}

console.log(highestOutput, highestSignal);







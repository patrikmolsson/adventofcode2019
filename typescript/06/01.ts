// const fs = require('fs');
// const inputRaw = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\06\\input.txt', 'utf-8');
// const input = inputRaw.split('\n');

// // console.log(input);

// // const input = [
// // 'COM)B',
// // 'B)C',
// // 'C)D',
// // 'D)E',
// // 'E)F',
// // 'B)G',
// // 'G)H',
// // 'D)I',
// // 'E)J',
// // 'J)K',
// // 'K)L'];

// class Point {
//     constructor(public parent?: Point){}
// }

// const points: { [name: string]: Point } = {};


// function processLine(row: string) {
//     const [parentName, childName] = row.split(')');

//     let parent = points[parentName];
//     if (!parent) {
//         parent = new Point();
//     }

//     let child = points[childName];

//     if (child) {
//         child.parent = parent;
//     } else {
//         child = new Point(parent);
//     }

//     points[parentName] = parent;
//     points[childName] = child;
// }

// for (const row of input) {
//     console.log(row);
//     processLine(row);
// }

// function tracePoint(point: Point): number {
//     if (!point.parent) {
//         return 0;
//     }

//     return tracePoint(point.parent) + 1;
// }

// let orbits = 0;
// for (const point of Object.keys(points)) {
//     orbits += tracePoint(points[point]);
// }

// console.log(points, orbits);
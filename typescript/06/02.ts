const fs = require('fs');
const inputRaw = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\06\\input.txt', 'utf-8');
const input = inputRaw.split('\n');

// console.log(input);

// const input = [
// 'COM)B',
// 'B)C',
// 'C)D',
// 'D)E',
// 'E)F',
// 'B)G',
// 'G)H',
// 'D)I',
// 'E)J',
// 'J)K',
// 'K)L'];

class Point {
    constructor(public name: string, public parent?: Point){}
}

const points: { [name: string]: Point } = {};


function processLine(row: string) {
    const [parentName, childName] = row.split(')');

    let parent = points[parentName];
    if (!parent) {
        parent = new Point(parentName);
    }

    let child = points[childName];

    if (child) {
        child.parent = parent;
    } else {
        child = new Point(childName, parent);
    }

    points[parentName] = parent;
    points[childName] = child;
}

for (const row of input) {
    // console.log(row);
    processLine(row);
}

function tracePoint(point: Point, untilPoint: Point): number {
    let hops = 0;
    while (point !== untilPoint) {
        point = point.parent;
        hops += 1;
    }
    return hops;
}



function findCommonParent(pointOne: Point, pointTwo: Point) {
    let ancestorOne = pointOne.parent;
    let ancestorTwo = pointTwo.parent;

    while(ancestorOne.name !== ancestorTwo.name) {
        ancestorTwo = ancestorTwo.parent;

        if (ancestorTwo.name === 'COM') {
            ancestorTwo = pointTwo.parent;
            ancestorOne = ancestorOne.parent;
        }
    }

    return ancestorTwo;
}

const commonParent = findCommonParent(points['YOU'], points['SAN']);

let orbits = 0;

orbits += tracePoint(points['YOU'].parent, commonParent);
orbits += tracePoint(points['SAN'].parent, commonParent);

console.log(orbits);
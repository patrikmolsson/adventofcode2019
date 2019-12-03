const fs = require('fs');

const input = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\03\\input.txt', 'utf-8');

const INTERSECT = -1;

let numbers = input.split('\n').map(row => row.split(','));

const intersects = [];
const grid = {};

function getCoordsLeft(startColumn, startRow, offset) {
    return [startColumn - offset, startRow];
}

function getCoordsRight(startColumn, startRow, offset) {
    return [startColumn + offset, startRow];
}

function getCoordsUp(startColumn, startRow, offset) {
    return [startColumn, startRow + offset];
}

function getCoordsDown(startColumn, startRow, offset) {
    return [startColumn, startRow - offset];
}

function fill(startColumn, startRow, length, direction, MY_LINE) {
    let coords;

    for (var i = 1; i <= length; i++) {
        if (direction === 'U') {
            coords = getCoordsUp(startColumn, startRow, i);
        }
        if (direction === 'D') {
            coords = getCoordsDown(startColumn, startRow, i);
        }
        if (direction === 'L') {
            coords = getCoordsLeft(startColumn, startRow, i);
        }
        if (direction === 'R') {
            coords = getCoordsRight(startColumn, startRow, i);
        }

        // row doesnt exist
        if (!grid[coords[0]]) {
            grid[coords[0]] = {};
        }

        // Intersecting coord, don't care
        if (grid[coords[0]][coords[1]] === INTERSECT) {
            continue;
        }
        // Crossing myself, don't care
        if (grid[coords[0]][coords[1]] === MY_LINE) {
            continue;
        }

        // Empty coord
        if (!grid[coords[0]][coords[1]]) {
            grid[coords[0]][coords[1]] = MY_LINE;
            continue;
        }

        grid[coords[0]][coords[1]] = INTERSECT;
        intersects.push([coords[0], coords[1]]);
    }

    return coords;
}

function processLine(startColumn, startRow, input, rowIndex) {
    let column = startColumn;
    let row = startRow;

    let i = 0;
    for (const instruction of input) {
        const direction = instruction.charAt(0);
        const length = Number(instruction.substr(1));

        // console.log('filling', column, row, length, direction);
        [column, row] = fill(column, row, length, direction, rowIndex);
        i++;
        if (i === 2) {
            // break;
        }
    }
}

const intersectSteps = {};

function fillNumSteps(startColumn, startRow, length, direction, rowIndex, initNumSteps) {
    let coords;
    let numSteps = initNumSteps;

    for (var i = 1; i <= length; i++) {
        numSteps += 1;
        if (direction === 'U') {
            coords = getCoordsUp(startColumn, startRow, i);
        }
        if (direction === 'D') {
            coords = getCoordsDown(startColumn, startRow, i);
        }
        if (direction === 'L') {
            coords = getCoordsLeft(startColumn, startRow, i);
        }
        if (direction === 'R') {
            coords = getCoordsRight(startColumn, startRow, i);
        }

        // Non-intersecting coord, don't care
        if (grid[coords[0]][coords[1]] !== INTERSECT) {
            continue;
        }

        if (!intersectSteps[coords[0]]) {
            intersectSteps[coords[0]] = {};
        }
        if (!intersectSteps[coords[0]][coords[1]]) {
            intersectSteps[coords[0]][coords[1]] = {};
        }

        // I don't exist
        if (!intersectSteps[coords[0]][coords[1]][rowIndex]) {
            intersectSteps[coords[0]][coords[1]][rowIndex] = numSteps;
        }
    }

    return [...coords, numSteps];
}

function countSteps(startColumn, startRow, input, rowIndex) {
    let column = startColumn;
    let row = startRow;

    let numSteps = 0;
    for (const instruction of input) {
        const direction = instruction.charAt(0);
        const length = Number(instruction.substr(1));

        // console.log('filling', column, row, length, direction);
        [column, row, numSteps] = fillNumSteps(column, row, length, direction, rowIndex, numSteps);
    }
}

processLine(0, 0, numbers[0], 1);
processLine(0, 0, numbers[1], 2);
countSteps(0, 0, numbers[0], 1);
countSteps(0, 0, numbers[1], 2);

const dists = Object.values(intersectSteps).reduce((arrs, row) => {
    console.log('row', row);
    return [...arrs, ...Object.values(row).reduce((innerArrs, col) => {
        console.log('col', col);
        return [...innerArrs, Object.values(col)];
    }, [])];
}, []);

const shortest = dists.reduce((shortestDistanceSoFar, curr) => {
    const dist = Math.abs(curr[0]) + Math.abs(curr[1]);
    if (dist < shortestDistanceSoFar) {
        return dist;
    }
    return shortestDistanceSoFar;
}, Number.MAX_SAFE_INTEGER)

console.log(shortest);
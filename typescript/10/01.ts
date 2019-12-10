// const fs = require('fs');
// const inputRaw = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\06\\input.txt', 'utf-8');

type Coords = [number, number];
type Direction = 'LEFT' | 'RIGHT';
const chars = {
    ASTEROID: '#',
};
// const inputRaw = `.#..#
// .....
// #####
// ....#
// ...##`;
// const inputRaw = `......#.#.
// #..#.#....
// ..#######.
// .#.#.###..
// .#..#.....
// ..#....#.#
// #..#....#.
// .##.#..###
// ##...#..#.
// .#....####`;
// const inputRaw = `#.#...#.#.
// .###....#.
// .#....#...
// ##.#.#.#.#
// ....#.#.#.
// .##..###.#
// ..#...##..
// ..##....##
// ......#...
// .####.###.`;
const inputRaw = `.............#..#.#......##........#..#
.#...##....#........##.#......#......#.
..#.#.#...#...#...##.#...#.............
.....##.................#.....##..#.#.#
......##...#.##......#..#.......#......
......#.....#....#.#..#..##....#.......
...................##.#..#.....#.....#.
#.....#.##.....#...##....#####....#.#..
..#.#..........#..##.......#.#...#....#
...#.#..#...#......#..........###.#....
##..##...#.#.......##....#.#..#...##...
..........#.#....#.#.#......#.....#....
....#.........#..#..##..#.##........#..
........#......###..............#.#....
...##.#...#.#.#......#........#........
......##.#.....#.#.....#..#.....#.#....
..#....#.###..#...##.#..##............#
...##..#...#.##.#.#....#.#.....#...#..#
......#............#.##..#..#....##....
.#.#.......#..#...###...........#.#.##.
........##........#.#...#.#......##....
.#.#........#......#..........#....#...
...............#...#........##..#.#....
.#......#....#.......#..#......#.......
.....#...#.#...#...#..###......#.##....
.#...#..##................##.#.........
..###...#.......#.##.#....#....#....#.#
...#..#.......###.............##.#.....
#..##....###.......##........#..#...#.#
.#......#...#...#.##......#..#.........
#...#.....#......#..##.............#...
...###.........###.###.#.....###.#.#...
#......#......#.#..#....#..#.....##.#..
.##....#.....#...#.##..#.#..##.......#.
..#........#.......##.##....#......#...
##............#....#.#.....#...........
........###.............##...#........#
#.........#.....#..##.#.#.#..#....#....
..............##.#.#.#...........#.....`
const input = inputRaw.split('\n');

const asteroids: Coords[] = [];

let rowIndex = 0;
for(const row of input) {
    let colIndex = 0;
    for (const char of row) {
        if (char === chars.ASTEROID) {
            asteroids.push([colIndex, rowIndex]);
        }
        colIndex += 1
    }
    rowIndex += 1;
}

type K = {
    direction: Direction;
    slope: number; 
}

function calculateK([fromX, fromY]: Coords, [toX, toY]: Coords): K {
    let direction: Direction;

    if (fromX < toX) {
        direction = 'RIGHT';
    } else if (fromX > toX) {
        direction = 'LEFT';
    } else {
        direction = fromY < toY ? 'LEFT' : 'RIGHT';
    }
    
    if (fromX === toX) {
        return { direction, slope: Number.MAX_SAFE_INTEGER };
    }
    if (fromY === toY) {
        return { direction, slope: 0 };
    }

    // This is wrong, but doesnt matter
    const slope = (fromY - toY) / (fromX - toX);
    return {
        slope,
        direction,
    }
}

let maxCount: number = -1;
let asteroidCandidate: Coords;

for (const asteroidFrom of asteroids) {
    let ks: K[] = [];

    for (const asteroidTo of asteroids) {
        if (asteroidFrom === asteroidTo) {
            continue;
        }

        const k = calculateK(asteroidFrom, asteroidTo);

        if (ks.findIndex(existingK => existingK.direction === k.direction && existingK.slope === k.slope) > -1) {
            continue;
        }

        ks.push(k);
    }

    if (ks.length > maxCount)  {
        maxCount = ks.length;
        asteroidCandidate = asteroidFrom;
    }
}

console.log(asteroidCandidate, maxCount);
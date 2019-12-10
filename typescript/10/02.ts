// const fs = require('fs');
// const inputRaw = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\06\\input.txt', 'utf-8');

type Coords = [number, number];
type Direction = 'LEFT' | 'RIGHT';
type K = {
    distance: number;
    direction: Direction;
    slope: number;
    coords: Coords;
}

const chars = {
    ASTEROID: '#',
    SHOT: 'z',
    EMPTY: '.',
};
const inputRaw = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;
const input = inputRaw.split('\n');


function mapAsteroids() {
    const ast: Coords[] = [];
    let rowIndex = 0;
    for (const row of input) {
        let colIndex = 0;
        for (const char of row) {
            if (char === chars.ASTEROID) {
                ast.push([colIndex, rowIndex]);
            }
            colIndex += 1
        }
        rowIndex += 1;
    }

    return ast;
}

let asteroids = mapAsteroids();

function calculateK([fromX, fromY]: Coords, [toX, toY]: Coords): K {
    const coords: Coords = [toX, toY];
    const distance = Math.sqrt(Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2));
    let direction: Direction;

    if (fromX < toX) {
        direction = 'RIGHT';
    } else if (fromX > toX) {
        direction = 'LEFT';
    } else {
        direction = fromY < toY ? 'LEFT' : 'RIGHT';
    }

    if (fromX === toX) {
        const slope = direction === 'RIGHT' ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
        return { distance, direction, slope, coords };
    }
    if (fromY === toY) {
        return { distance, direction, slope: 0, coords };
    }

    // This is wrong, but doesnt matter
    const slope = (fromY - toY) / (fromX - toX);
    return {
        coords,
        slope,
        direction,
        distance,
    }
}

let maxCount: number = -1;
let station: Coords = [11, 13];

function getClosestAsteroids() {
    let ks: K[] = [];

    for (const asteroidTo of asteroids) {
        if (station[0] === asteroidTo[0] && station[1] === asteroidTo[1]) {
            continue;
        }

        const k = calculateK(station, asteroidTo);

        const existingKsIndex = ks.findIndex(existingK => existingK.direction === k.direction && existingK.slope === k.slope);
        if (existingKsIndex > -1) {
            if (k.distance < ks[existingKsIndex].distance) {
                ks[existingKsIndex] = k;
            }

            continue;
        }

        ks.push(k);
    }

    return ks;
}

let shotAsteroids = 0;
let lastShotDirection = {
    direction: 'RIGHT',
    slope: Number.MAX_SAFE_INTEGER,
}

while (shotAsteroids < 200) {
    const closestAsteroids = getClosestAsteroids();

    console.log(closestAsteroids.length);

    closestAsteroids.sort((a, b) => {
        if (a.direction !== b.direction) {
            // Rights are lower index
            return a.direction === 'RIGHT' ? -1 : 1;
        }


        // Both have right
        if (a.direction === 'RIGHT') {
            // The biggest slope first 
            return a.slope > b.slope ? -1 : 1;
        }
        // Both have left
        if (a.direction === 'LEFT') {
            // The smallest slope first 
            return a.slope < b.slope ? -1 : 1;
        }

        throw new Error('Should never happen');
    });

    const shotAsteroid = closestAsteroids[0];

    console.log(asteroids.length);

    asteroids = asteroids.filter(a => a[0] !== shotAsteroid.coords[0] || a[1] !== shotAsteroid.coords[1]);

    console.log(asteroids.length);
    shotAsteroids += 1;

    console.log('Shot asteroid', shotAsteroid, 'as #', shotAsteroids);
}

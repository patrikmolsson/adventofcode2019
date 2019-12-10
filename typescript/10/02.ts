// const fs = require('fs');
// const inputRaw = fs.readFileSync('D:\\repos\\adventofcode2019\\typescript\\06\\input.txt', 'utf-8');

type Coords = [number, number];
type Direction = 'LEFT' | 'RIGHT';
type K = {
  distance: number;
  angle: number;
  coords: Coords;
}

const chars = {
  ASTEROID: '#',
  SHOT: 'z',
  EMPTY: '.',
};
// const inputRaw = `.#..##.###...#######
// ##.############..##.
// .#.######.########.#
// .###.#######.####.#.
// #####.##.#.##.###.##
// ..#####..#.#########
// ####################
// #.####....###.#.#.##
// ##.#################
// #####.##.###..####..
// ..######..##.#######
// ####.##.####...##..#
// .#####..#.######.###
// ##...#.##########...
// #.##########.#######
// .####.#.###.###.#.##
// ....##.##.###..#####
// .#.#.###########.###
// #.#.#.#####.####.###
// ###.##.####.##.#..##`;
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

let station: Coords = [26, 29];


function mapAsteroids() {
  const ast: Coords[] = [];
  let rowIndex = 0;
  for (const row of input) {
    let colIndex = 0;
    for (const char of row) {
      if (char === chars.ASTEROID) {
        ast.push([colIndex, rowIndex]);
      }
      colIndex += 1;
    }
    rowIndex += 1;
  }

  return ast;
}

let asteroids = mapAsteroids();

function normalizeAngle(angle: number) {
  if (angle < 0) {
    return 2 * Math.PI + angle;
  }

  return angle;
}

function calculateK([fromX, fromY]: Coords, [toX, toY]: Coords): K {
  const coords: Coords = [toX, toY];
  const distX = toX - fromX;
  const distY = toY - fromY;

  const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
  let angle = Math.atan2(distY, distX);

  angle = normalizeAngle(angle);

  return {
    angle,
    coords,
    distance,
  };
}

function getClosestAsteroids() {
  let ks: K[] = [];

  for (const asteroidTo of asteroids) {
    if (station[0] === asteroidTo[0] && station[1] === asteroidTo[1]) {
      continue;
    }

    const k = calculateK(station, asteroidTo);

    const asteroidAtExistingAngleIndex = ks.findIndex(existingK => existingK.angle === k.angle);
    if (asteroidAtExistingAngleIndex > -1) {
      if (k.distance < ks[asteroidAtExistingAngleIndex].distance) {
        ks[asteroidAtExistingAngleIndex] = k;
      }
    } else {
      ks.push(k);
    }
  }

  return ks;
}

let shotAsteroids = 0;
// Dummy
let angleDiff = 0.000001;
let lastShotAngle = 1.5 * Math.PI - angleDiff;

while (shotAsteroids < 200) {
  console.log(lastShotAngle);
  const closestAsteroids = getClosestAsteroids();

  closestAsteroids.sort((a, b) => {
    const angleToA = normalizeAngle(a.angle - lastShotAngle);
    const angleToB = normalizeAngle(b.angle - lastShotAngle);

    return angleToA - angleToB;
  });
  // console.log(closestAsteroids);
  const shotAsteroid = closestAsteroids[0];

  asteroids = asteroids.filter(a => a[0] !== shotAsteroid.coords[0] || a[1] !== shotAsteroid.coords[1]);

  lastShotAngle = shotAsteroid.angle + angleDiff;
  shotAsteroids += 1;

  console.log('Shot asteroid', shotAsteroid, 'as #', shotAsteroids);
}

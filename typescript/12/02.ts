const fs = require('fs');

type Pos = {
  x: number,
  y: number,
  z: number,
};

type Vel = {
  x: number,
  y: number,
  z: number,
};

type Moon = {
  vel: Vel,
  pos: Pos,
};

// const moons: Moon[] = [
//     {
//         pos: { x: -1, y: 0, z: 2 },
//         vel: { x: 0, y: 0, z: 0 },
//     },
//     {
//         pos: { x: 2, y: -10, z: -7 },
//         vel: { x: 0, y: 0, z: 0 },
//     },
//     {
//         pos: { x: 4, y: -8, z: 8 },
//         vel: { x: 0, y: 0, z: 0 },
//     },
//     {
//         pos: { x: 3, y: 5, z: -1 },
//         vel: { x: 0, y: 0, z: 0 },
//     },
// ]

// LONG EXAMPLE
// const moons: Moon[] = [
//   {
//     pos: {x: -8, y: -10, z: 0},
//     vel: {x: 0, y: 0, z: 0},
//   },
//   {
//     pos: {x: 5, y: 5, z: 10},
//     vel: {x: 0, y: 0, z: 0},
//   },
//   {
//     pos: {x: 2, y: -7, z: 3},
//     vel: {x: 0, y: 0, z: 0},
//   },
//   {
//     pos: {x: 9, y: -8, z: -3},
//     vel: {x: 0, y: 0, z: 0},
//   },
// ];

// REAL DATA:
const moons: Moon[] = [
  {
    pos: {x: 17, y: -9, z: 4},
    vel: {x: 0, y: 0, z: 0},
  },
  {
    pos: {x: 2, y: 2, z: -13},
    vel: {x: 0, y: 0, z: 0},
  },
  {
    pos: {x: -1, y: 5, z: -1},
    vel: {x: 0, y: 0, z: 0},
  },
  {
    pos: {x: 4, y: 7, z: -7},
    vel: {x: 0, y: 0, z: 0},
  },
];

const moonsCopies = JSON.parse(JSON.stringify(moons));

function updateVelocities() {
  for (const moonToChange of moons) {
    for (const moonToCompareWith of moons) {
      let diffX = 0;
      if (moonToChange.pos.x !== moonToCompareWith.pos.x) {
        // Double check
        diffX = moonToChange.pos.x < moonToCompareWith.pos.x ? 1 : -1;
      }
      let diffY = 0;
      if (moonToChange.pos.y !== moonToCompareWith.pos.y) {
        // Double check
        diffY = moonToChange.pos.y < moonToCompareWith.pos.y ? 1 : -1;
      }
      let diffZ = 0;
      if (moonToChange.pos.z !== moonToCompareWith.pos.z) {
        // Double check
        diffZ = moonToChange.pos.z < moonToCompareWith.pos.z ? 1 : -1;
      }

      moonToChange.vel.x += diffX;
      moonToChange.vel.y += diffY;
      moonToChange.vel.z += diffZ;
    }
  }
}

function updatePositions() {
  for (const moon of moons) {
    moon.pos.x += moon.vel.x;
    moon.pos.y += moon.vel.y;
    moon.pos.z += moon.vel.z;
  }
}

function moonComparer(a: Moon, b: Moon, property: string) {
  if (a.pos[property] !== b.pos[property]) {
    return false;
  }
  if (a.vel[property] !== b.vel[property]) {
    return false;
  }
  return true;
}

function isInitialState(property: string) {
  for (let i = 0; i < moons.length; i += 1) {
    if (!moonComparer(moons[i], moonsCopies[i], property)) {
      return false;
    }
  }

  return true;
}

const maxSteps = Number.MAX_SAFE_INTEGER;

function run() {
  let step = 1;

  for (; step <= maxSteps; step += 1) {
    updateVelocities();
    updatePositions();

    if (isInitialState('x')) {
      break;
    }
  }

  console.log(step);
}

// LONG EXAMPLE
// const xPeriodicity = 2028;
// const yPeriodicity = 5898;
// const zPeriodicity = 4702;

// REAL DATA
const xPeriodicity = 231614;
const yPeriodicity = 96236;
const zPeriodicity = 193052;

run();




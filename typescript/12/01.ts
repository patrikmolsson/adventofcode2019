
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

const moons: Moon[] = [
    {
        pos: { x: 17, y: -9, z: 4 },
        vel: { x: 0, y: 0, z: 0 },
    },
    {
        pos: { x: 2, y: 2, z: -13 },
        vel: { x: 0, y: 0, z: 0 },
    },
    {
        pos: { x: -1, y: 5, z: -1 },
        vel: { x: 0, y: 0, z: 0 },
    },
    {
        pos: { x: 4, y: 7, z: -7 },
        vel: { x: 0, y: 0, z: 0 },
    },
]
// <x=17, y=-9, z=4>
// <x=2, y=2, z=-13>
// <x=-1, y=5, z=-1>
// <x=4, y=7, z=-7>

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
function calculatePotentialEnergy(moon: Moon) {
    return Math.abs(moon.pos.x) + Math.abs(moon.pos.y) + Math.abs(moon.pos.z);
}

function calculateKineticEnergy(moon: Moon) {
    return Math.abs(moon.vel.x) + Math.abs(moon.vel.y) + Math.abs(moon.vel.z);
}

function calculateEnergy() {
    let sum = 0;
    for (const moon of moons) {
        sum += calculatePotentialEnergy(moon) * calculateKineticEnergy(moon);
    }

    return sum;
}

const maxSteps = 100;
for (let step = 1; step <= maxSteps; step += 1) {
    updateVelocities();
    updatePositions();
}

console.log(calculateEnergy());
console.log(moons);
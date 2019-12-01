const input = require('./01_input.json');

const calculateFuel = (mass: number) => {
  const fuelNeeded = Math.floor(mass/3) - 2;

  if (fuelNeeded < 0) {
    return 0;
  }

  return fuelNeeded + calculateFuel(fuelNeeded);
};

let totalFuel: number = 0;
for (const mass of input.masses) {
  totalFuel += calculateFuel(mass);
}

console.log(totalFuel);

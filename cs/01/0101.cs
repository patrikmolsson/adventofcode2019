using System;

namespace cs {
    public static class Day0101 {
        public static void Run() {
            string[] lines = System.IO.File.ReadAllLines(@"C:\Users\paolsson\Development\adventofcode\cs\01\01_input.txt");

            var totalMass = 0;
            foreach (var line in lines) {
                int.TryParse(line, out var mass);

                totalMass += CalculateFuel(mass);
            }

            Console.WriteLine(totalMass);
        }

        private static int CalculateFuel(int mass) {
            return mass / 3 - 2;
        }
    }

}
const createAmp = require('./intCode');

type Instruction = {
  x?: number,
  y?: number,
  output?: Tiles,
}

enum Tiles {
  EMPTY = 0,
  WALL,
  BLOCK,
  HORIZONTA_PADDLE,
  BALL,
}

const numbers = [1, 380, 379, 385, 1008, 2719, 612378, 381, 1005, 381, 12, 99, 109, 2720, 1102, 1, 0, 383, 1102, 0, 1, 382, 21002, 382, 1, 1, 21001, 383, 0, 2, 21101, 37, 0, 0, 1106, 0, 578, 4, 382, 4, 383, 204, 1, 1001, 382, 1, 382, 1007, 382, 40, 381, 1005, 381, 22, 1001, 383, 1, 383, 1007, 383, 26, 381, 1005, 381, 18, 1006, 385, 69, 99, 104, -1, 104, 0, 4, 386, 3, 384, 1007, 384, 0, 381, 1005, 381, 94, 107, 0, 384, 381, 1005, 381, 108, 1105, 1, 161, 107, 1, 392, 381, 1006, 381, 161, 1102, 1, -1, 384, 1105, 1, 119, 1007, 392, 38, 381, 1006, 381, 161, 1101, 0, 1, 384, 20102, 1, 392, 1, 21102, 24, 1, 2, 21102, 0, 1, 3, 21102, 138, 1, 0, 1105, 1, 549, 1, 392, 384, 392, 20102, 1, 392, 1, 21101, 0, 24, 2, 21101, 0, 3, 3, 21101, 0, 161, 0, 1105, 1, 549, 1102, 0, 1, 384, 20001, 388, 390, 1, 21001, 389, 0, 2, 21102, 1, 180, 0, 1106, 0, 578, 1206, 1, 213, 1208, 1, 2, 381, 1006, 381, 205, 20001, 388, 390, 1, 21001, 389, 0, 2, 21101, 0, 205, 0, 1105, 1, 393, 1002, 390, -1, 390, 1102, 1, 1, 384, 20102, 1, 388, 1, 20001, 389, 391, 2, 21102, 1, 228, 0, 1106, 0, 578, 1206, 1, 261, 1208, 1, 2, 381, 1006, 381, 253, 20102, 1, 388, 1, 20001, 389, 391, 2, 21101, 0, 253, 0, 1105, 1, 393, 1002, 391, -1, 391, 1101, 0, 1, 384, 1005, 384, 161, 20001, 388, 390, 1, 20001, 389, 391, 2, 21102, 279, 1, 0, 1105, 1, 578, 1206, 1, 316, 1208, 1, 2, 381, 1006, 381, 304, 20001, 388, 390, 1, 20001, 389, 391, 2, 21102, 1, 304, 0, 1105, 1, 393, 1002, 390, -1, 390, 1002, 391, -1, 391, 1102, 1, 1, 384, 1005, 384, 161, 21002, 388, 1, 1, 21002, 389, 1, 2, 21102, 0, 1, 3, 21101, 338, 0, 0, 1105, 1, 549, 1, 388, 390, 388, 1, 389, 391, 389, 21002, 388, 1, 1, 20101, 0, 389, 2, 21102, 1, 4, 3, 21101, 0, 365, 0, 1105, 1, 549, 1007, 389, 25, 381, 1005, 381, 75, 104, -1, 104, 0, 104, 0, 99, 0, 1, 0, 0, 0, 0, 0, 0, 432, 18, 21, 1, 1, 20, 109, 3, 22101, 0, -2, 1, 21202, -1, 1, 2, 21102, 1, 0, 3, 21101, 414, 0, 0, 1105, 1, 549, 21201, -2, 0, 1, 22101, 0, -1, 2, 21102, 1, 429, 0, 1106, 0, 601, 1201, 1, 0, 435, 1, 386, 0, 386, 104, -1, 104, 0, 4, 386, 1001, 387, -1, 387, 1005, 387, 451, 99, 109, -3, 2105, 1, 0, 109, 8, 22202, -7, -6, -3, 22201, -3, -5, -3, 21202, -4, 64, -2, 2207, -3, -2, 381, 1005, 381, 492, 21202, -2, -1, -1, 22201, -3, -1, -3, 2207, -3, -2, 381, 1006, 381, 481, 21202, -4, 8, -2, 2207, -3, -2, 381, 1005, 381, 518, 21202, -2, -1, -1, 22201, -3, -1, -3, 2207, -3, -2, 381, 1006, 381, 507, 2207, -3, -4, 381, 1005, 381, 540, 21202, -4, -1, -1, 22201, -3, -1, -3, 2207, -3, -4, 381, 1006, 381, 529, 22101, 0, -3, -7, 109, -8, 2106, 0, 0, 109, 4, 1202, -2, 40, 566, 201, -3, 566, 566, 101, 639, 566, 566, 2101, 0, -1, 0, 204, -3, 204, -2, 204, -1, 109, -4, 2105, 1, 0, 109, 3, 1202, -1, 40, 593, 201, -2, 593, 593, 101, 639, 593, 593, 21002, 0, 1, -2, 109, -3, 2105, 1, 0, 109, 3, 22102, 26, -2, 1, 22201, 1, -1, 1, 21102, 523, 1, 2, 21102, 588, 1, 3, 21101, 1040, 0, 4, 21102, 630, 1, 0, 1106, 0, 456, 21201, 1, 1679, -2, 109, -3, 2105, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 2, 2, 0, 1, 1, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 2, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0, 1, 1, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 0, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0, 2, 0, 2, 0, 2, 2, 0, 0, 2, 2, 0, 2, 2, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0, 1, 1, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 0, 0, 2, 0, 1, 1, 0, 0, 2, 2, 0, 2, 0, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 2, 2, 0, 2, 0, 0, 0, 2, 2, 0, 0, 1, 1, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 2, 0, 1, 1, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 0, 1, 1, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 1, 1, 0, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 53, 34, 9, 31, 78, 23, 10, 70, 2, 23, 4, 91, 45, 37, 6, 65, 96, 79, 60, 70, 83, 95, 31, 20, 21, 44, 67, 15, 76, 63, 62, 36, 5, 68, 83, 43, 7, 33, 22, 51, 49, 6, 11, 43, 95, 97, 89, 55, 82, 54, 15, 32, 83, 44, 57, 69, 21, 59, 81, 26, 79, 92, 43, 53, 34, 31, 10, 78, 8, 64, 16, 62, 44, 26, 81, 75, 4, 62, 77, 15, 38, 57, 3, 52, 75, 79, 66, 74, 54, 33, 77, 96, 91, 74, 14, 87, 61, 62, 47, 5, 14, 36, 13, 9, 62, 95, 97, 27, 98, 82, 55, 56, 38, 95, 73, 13, 25, 12, 67, 62, 89, 73, 22, 96, 70, 92, 46, 33, 60, 35, 84, 16, 84, 7, 86, 93, 89, 91, 59, 18, 71, 26, 84, 75, 91, 71, 59, 62, 20, 89, 77, 13, 58, 39, 71, 49, 35, 24, 70, 78, 74, 72, 24, 73, 90, 35, 55, 71, 4, 78, 81, 44, 16, 76, 84, 26, 94, 69, 63, 15, 45, 66, 81, 58, 4, 16, 5, 54, 67, 17, 65, 13, 81, 32, 75, 34, 20, 29, 43, 13, 49, 91, 67, 25, 44, 45, 69, 89, 9, 91, 61, 71, 57, 77, 4, 67, 80, 85, 95, 65, 95, 93, 32, 71, 1, 52, 9, 52, 58, 72, 73, 94, 36, 13, 60, 73, 70, 87, 27, 6, 18, 40, 81, 93, 14, 85, 85, 76, 91, 83, 22, 88, 24, 93, 93, 5, 97, 87, 25, 70, 97, 89, 82, 89, 8, 5, 3, 42, 16, 70, 82, 30, 82, 49, 69, 4, 42, 92, 72, 21, 58, 12, 83, 42, 9, 19, 33, 75, 12, 88, 64, 79, 37, 75, 33, 33, 56, 71, 6, 5, 78, 9, 2, 15, 80, 28, 80, 4, 60, 1, 80, 91, 77, 57, 47, 9, 19, 39, 93, 65, 69, 11, 61, 57, 45, 49, 94, 34, 28, 77, 77, 70, 54, 7, 13, 57, 68, 95, 64, 85, 61, 12, 50, 75, 76, 33, 8, 14, 71, 72, 61, 47, 21, 12, 83, 33, 71, 97, 27, 3, 5, 96, 52, 88, 12, 33, 62, 85, 58, 37, 18, 4, 57, 51, 79, 89, 77, 81, 33, 85, 51, 8, 57, 95, 44, 57, 10, 11, 33, 75, 65, 31, 35, 45, 19, 90, 79, 30, 84, 54, 15, 30, 43, 55, 64, 56, 18, 76, 41, 73, 69, 25, 81, 7, 68, 66, 86, 46, 56, 84, 7, 58, 77, 73, 18, 12, 53, 82, 86, 53, 45, 31, 77, 16, 38, 24, 98, 43, 38, 24, 78, 11, 32, 42, 70, 42, 35, 87, 77, 13, 35, 87, 18, 38, 65, 46, 85, 28, 2, 66, 21, 95, 34, 31, 75, 68, 46, 90, 83, 63, 88, 34, 5, 51, 87, 59, 70, 18, 93, 73, 24, 45, 31, 72, 71, 84, 22, 82, 4, 90, 97, 17, 51, 95, 68, 4, 32, 70, 63, 86, 10, 65, 60, 50, 27, 53, 61, 57, 56, 52, 31, 5, 71, 93, 70, 36, 70, 15, 8, 27, 8, 65, 3, 27, 72, 16, 71, 7, 26, 91, 16, 32, 33, 1, 90, 56, 59, 48, 2, 24, 58, 16, 95, 75, 92, 18, 33, 69, 21, 56, 22, 52, 54, 48, 9, 53, 71, 17, 57, 81, 61, 37, 14, 61, 41, 43, 74, 84, 78, 63, 51, 79, 40, 54, 26, 81, 93, 18, 6, 71, 68, 57, 36, 37, 62, 6, 44, 68, 73, 17, 66, 49, 24, 27, 9, 55, 66, 46, 76, 55, 98, 47, 75, 32, 51, 21, 90, 59, 44, 81, 22, 67, 10, 57, 46, 35, 97, 36, 69, 38, 5, 63, 22, 80, 91, 30, 88, 18, 91, 32, 63, 26, 1, 80, 57, 45, 60, 18, 7, 54, 86, 45, 31, 43, 17, 48, 8, 64, 45, 10, 71, 94, 85, 32, 90, 17, 97, 41, 24, 40, 1, 15, 54, 91, 66, 76, 7, 97, 30, 83, 82, 64, 23, 12, 87, 92, 98, 86, 18, 61, 86, 53, 77, 59, 81, 98, 78, 33, 31, 94, 23, 88, 39, 33, 23, 86, 76, 91, 32, 70, 32, 69, 30, 64, 52, 32, 1, 37, 82, 82, 79, 28, 57, 49, 23, 78, 78, 80, 84, 36, 54, 78, 40, 91, 51, 25, 70, 18, 8, 61, 44, 69, 12, 68, 44, 84, 85, 11, 21, 51, 91, 15, 77, 18, 78, 53, 52, 62, 92, 65, 49, 86, 66, 53, 36, 58, 11, 63, 98, 85, 47, 47, 71, 22, 91, 18, 40, 82, 2, 16, 74, 24, 98, 98, 89, 32, 23, 53, 19, 53, 74, 65, 22, 26, 51, 5, 77, 19, 22, 84, 38, 11, 96, 45, 21, 9, 94, 52, 3, 45, 79, 19, 12, 12, 30, 24, 50, 90, 92, 60, 64, 96, 8, 8, 79, 83, 21, 80, 7, 10, 72, 86, 37, 28, 68, 31, 39, 63, 90, 36, 1, 92, 96, 62, 87, 38, 62, 33, 40, 93, 92, 9, 29, 42, 34, 97, 58, 14, 75, 75, 1, 25, 10, 61, 43, 73, 23, 58, 34, 25, 69, 23, 22, 78, 51, 84, 38, 35, 13, 34, 5, 24, 49, 56, 43, 7, 82, 44, 38, 66, 28, 92, 66, 8, 46, 35, 30, 86, 71, 64, 54, 74, 57, 12, 76, 79, 75, 24, 83, 11, 74, 21, 11, 9, 57, 25, 93, 98, 94, 39, 67, 54, 68, 67, 63, 89, 18, 46, 83, 69, 94, 16, 23, 66, 40, 92, 55, 89, 68, 4, 48, 96, 53, 8, 60, 38, 96, 67, 11, 27, 87, 95, 66, 16, 57, 13, 1, 42, 89, 3, 55, 38, 84, 39, 28, 97, 2, 25, 83, 88, 93, 39, 13, 48, 30, 76, 43, 36, 64, 64, 11, 70, 76, 3, 13, 90, 63, 73, 6, 27, 76, 52, 76, 75, 65, 79, 26, 94, 94, 31, 52, 10, 64, 55, 88, 19, 92, 51, 69, 25, 44, 71, 75, 90, 21, 35, 54, 53, 28, 61, 68, 60, 82, 31, 3, 43, 93, 85, 4, 43, 13, 31, 7, 44, 16, 31, 25, 93, 70, 42, 36, 58, 90, 63, 94, 30, 91, 2, 17, 16, 612378];
const numbersMap = numbers.reduce((acc, curr, i) => ({
  ...acc,
  [i]: curr
}), {});

const amp = createAmp(numbersMap);

const grid = {};

let i = 0;
const numberOfInstructions = 3;
let instruction: Instruction = {};
while (true) {
  const output = amp(2);

  if (output == null) {
    break;
  }

  const instructionIndex = i % numberOfInstructions;
  switch (instructionIndex) {
    case 0: {
      instruction.x = output;
      break;
    }
    case 1: {
      instruction.y = output;
      break;
    }
    case 2: {
      instruction.output = output;
      break;
    }

    default: {
      console.error('Unknown instruction idx');
    }
  }

  if (instructionIndex === 2) {
    if (!grid[instruction.x]) {
      grid[instruction.x] = {};
    }
    grid[instruction.x][instruction.y] = instruction.output;

    instruction = {};
  }

  i += 1;
}

const amountOfNonEmptyTiles = Object.keys(grid).reduce((acc, rowIndex,) => {
    return acc + Object.keys(grid[rowIndex]).reduce((accRow, colIndex) => {
      return accRow + (grid[rowIndex][colIndex] === Tiles.BLOCK ? 1 : 0);
    }, 0);
  }, 0);

console.log(amountOfNonEmptyTiles);

function tileToCharacter(tile: Tiles) {
  switch (tile) {
    case Tiles.BALL: return 'O';
    case Tiles.WALL: return '|';
    case Tiles.BLOCK: return 'X';
    case Tiles.EMPTY: return ' ';
    case Tiles.HORIZONTA_PADDLE: return 'S';
  }
}

Object.keys(grid).forEach(rowIndex => {
  let row = '';

  Object.keys(grid[rowIndex]).forEach((colIndex) => {
    row += tileToCharacter(grid[rowIndex][colIndex]);
  });

  console.log(row);
});

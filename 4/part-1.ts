import fs from 'fs';

const neighbours_relative_positions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

function findAvailableRolls(map: string[]) {
    // We re-draw the full map, each cell is the sum of the 8 neighbours
    const sumMap = [] as number[][];

    for (let i = 0; i < map.length; i++) {
        sumMap[i] = [];
        for (let j = 0; j < map[i].length; j++) {
            if (map[i]?.[j] === '.') {
                sumMap[i][j] = -1;
                continue;
            }
            let sum = 0;
            for (const [x, y] of neighbours_relative_positions) {
                const newX = i + x;
                const newY = j + y;
                if (newX < 0 || newX >= map.length || newY < 0 || newY >= map[i].length) {
                    continue;
                }
                sum += +(map[newX]?.[newY] === '@');
            }
            sumMap[i][j] = sum;
        }
    }

    let amountOfAvailableRolls = 0;
    for (const row of sumMap) {
        for (const amountOfRollsAround of row) {
            if (amountOfRollsAround >= 0 && amountOfRollsAround < 4) {
                amountOfAvailableRolls++;
            }
        }
    }

    return amountOfAvailableRolls;
}

const input = fs.readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");
const availableRolls = findAvailableRolls(lines);
console.log('Available rolls =', availableRolls);

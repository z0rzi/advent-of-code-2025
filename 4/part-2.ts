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

function removeRolls(map: string[]): [string[], number] {
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

    let amountOfRemovedRolls = 0;
    const newMap = [] as string[];
    for (const row of sumMap) {
        let lineStr = '';
        for (const amountOfRollsAround of row) {
            if (amountOfRollsAround >= 0 && amountOfRollsAround < 4) {
                amountOfRemovedRolls++;
                lineStr += '.';
            } else if (amountOfRollsAround < 0) {
                row[amountOfRollsAround] = -1;
                lineStr += '.';
            } else {
                lineStr += '@';
            }
        }
        newMap.push(lineStr);
    }

    return [newMap, amountOfRemovedRolls];
}

const input = fs.readFileSync("input.txt", "utf8").trim();
let map = input.split("\n");
let totalRemovedRolls = 0;
let removedRolls = 1;
while (removedRolls > 0) {
    [map, removedRolls] = removeRolls(map);
    totalRemovedRolls += removedRolls;
}
console.log('Total removeable rolls rolls =', totalRemovedRolls);

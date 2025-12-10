import fs from "fs";

function indexesOf(str: string, char: string) {
  const indexes = new Set<number>();
  let index = 0;
  while (true) {
    const nextIndex = str.indexOf(char, index);
    if (nextIndex === -1) return indexes;
    indexes.add(nextIndex);
    index = nextIndex + 1;
  }
}

function countSplits(
  map: string[],
  column: number
) {
  let beamColumns = new Set([column]);

  let splitCount = 0;
  for (let i=1; i < map.length; i++) {
    const splitterCols = indexesOf(map[i], "^");

    const newBeamColumns = new Set<number>(beamColumns);
    for (const splitterCol of splitterCols) {
      if (beamColumns.has(splitterCol)) {
        splitCount++;
        newBeamColumns.delete(splitterCol);
        newBeamColumns.add(splitterCol - 1);
        newBeamColumns.add(splitterCol + 1);
      }
    }

    beamColumns = newBeamColumns;
  }

  return splitCount;
}

const input = fs.readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");

const startColumn = lines[0].indexOf("S");

if (startColumn === -1) {
  throw new Error("S not found");
}

const count = countSplits(lines, startColumn);
console.log("Amount of splits:", count);

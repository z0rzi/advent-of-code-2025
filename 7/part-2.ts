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

function countTimelines(map: string[], column: number) {
  /**
   * The amount of timelines in each column
   * column -> amount of timelines
   */
  let beamPossibilities = new Map<number, number>();
  beamPossibilities.set(column, 1);

  for (let i = 1; i < map.length; i++) {
    const splitterCols = indexesOf(map[i], "^");

    const newBeamPossibilities = new Map<number, number>();

    /**
     * To add possibilities at a current position.
     * Sums up the current possibilities at the position and adds the amount of possibilities
     */
    function addBeamPossibility(col: number, amount: number) {
      if (newBeamPossibilities.has(col)) {
        newBeamPossibilities.set(col, newBeamPossibilities.get(col)! + amount);
      } else {
        newBeamPossibilities.set(col, amount);
      }
    }

    for (const col of beamPossibilities.keys()) {
      const currentPossibilitySplitsAmount = beamPossibilities.get(col)!;

      if (splitterCols.has(col)) {
        // We split the beam(s)
        addBeamPossibility(col - 1, currentPossibilitySplitsAmount);
        addBeamPossibility(col + 1, currentPossibilitySplitsAmount);
      } else {
        // The beam(s) stays
        addBeamPossibility(col, currentPossibilitySplitsAmount);
      }
    }

    beamPossibilities = newBeamPossibilities;
  }

  let totalTimelines = 0;
  for (const amount of beamPossibilities.values()) {
    totalTimelines += amount;
  }

  return totalTimelines;
}

const input = fs.readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");

const startColumn = lines[0].indexOf("S");

if (startColumn === -1) {
  throw new Error("S not found");
}

const count = countTimelines(lines, startColumn);
console.log("Amount of splits:", count);

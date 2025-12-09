import fs from "fs";

function cleanRanges(ranges: number[][]) {
  // Sorting the ranges by the start value
  ranges.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    if (a[1] < b[1]) {
      return -1;
    }
    if (a[1] > b[1]) {
      return 1;
    }
    return 0;
  });

  const niceRanges: number[][] = [];
  for (let i = 0; i < ranges.length; i++) {
    let range1 = ranges[i];
    for (let j = i + 1; j < ranges.length; j++) {
      const range2 = ranges[j];
      // Because we start at `i+1`, and the ranges are sorted, we know that
      // range1[0] <= range2[0]

      if (range2[0] > range1[1]) {
        // The ranges are completely disjoint
        break;
      }

      // The ranges overlap,
      // we replace the end of the range with the max
      i++;
      range1[1] = Math.max(range1[1], range2[1]);
    }
    niceRanges.push(range1);
  }

  return niceRanges;
}

const input = fs.readFileSync("input.txt", "utf8").trim();
const [freshIngredientsRaw] = input.split("\n\n");
const freshRanges = freshIngredientsRaw
  .split("\n")
  .map((range) => range.split("-").map(Number));

const ranges = cleanRanges(freshRanges);
let freshCount = 0;
for (const range of ranges) {
  freshCount += range[1] - range[0] + 1;
}
console.log("Fresh ingredients:", freshCount);

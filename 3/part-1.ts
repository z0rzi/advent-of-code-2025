#!/usr/bin/env bun

import fs from "fs";

function findBestTwoBatteries(batValues: string) {
  let idx1 = -1;

  for (let i = 9; i >= 1; i--) {
    idx1 = batValues.indexOf(i.toString());
    if (idx1 >= 0 && idx1 < batValues.length - 1) {
      break;
    }
  }
  if (idx1 < 0) throw new Error("No battery found");

  let idx2 = -1;
  for (let i = 9; i >= 1; i--) {
    idx2 = batValues.indexOf(i.toString(), idx1 + 1);
    if (idx2 >= 0) {
      break;
    }
  }

  return +(batValues[idx1] + batValues[idx2]);
}


const input = fs.readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");
let sum = 0;
for (const line of lines) {
  const best = findBestTwoBatteries(line);
  sum += best;
}
console.log('Max joltage =', sum);

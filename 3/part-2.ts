#!/usr/bin/env bun

import fs from "fs";

function findBestTwelveBatteries(batValues: string) {
  // For each digit, if the one right after it is smaller, we remove it.
  // We start at the very left. Every time we remove a digit, we start from the very left again.
  //
  // If no deletion was made (the serie is sorted), we return the first 12 digits.

  while (batValues.length > 12) {
    let sliced = false;
    for (let i=0; i < batValues.length - 1 ; i++) {
      if (batValues[i] < batValues[i+1]) {
        batValues = batValues.slice(0, i) + batValues.slice(i+1);
        sliced = true;
        break;
      }
    }
    if (!sliced) {
      return +batValues.slice(0, 12);
    }
  }
  return +batValues;
}


const input = fs.readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");
let sum = 0;
for (const line of lines) {
  const best = findBestTwelveBatteries(line);
  sum += best;
}
console.log('Max joltage =', sum);

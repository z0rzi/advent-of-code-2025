#!/usr/bin/env bun

import fs from "fs";

function isSillyInput(input: string) {
  // For each possible pattern size
  for (let patternSize = 1; patternSize <= input.length / 2; patternSize++) {
    if (input.length % patternSize) {
      // Input is not divisible by patternSize, not the right size
      continue;
    }

    let patternValid = true;
    // Checking for each pattern, if equal to the start of the input
    for (let patIdx = 1; patIdx < input.length / patternSize; patIdx++) {
      for (let i = 0; i < patternSize; i++) {
        if (input[i] !== input[patternSize * patIdx + i]) {
          // We found a mismatch, not the right pattern.
          patternValid = false;
          break;
        }
      }
      if (!patternValid) break;
    }

    if (patternValid) return true;
  }
  return false;
}

const input = fs.readFileSync("./product-ids.txt", "utf8");
const ranges = input
  .split(",")
  .map((rawRange) => rawRange.split("-").map(Number));

let sumOfSillyIds = 0;
for (const range of ranges) {
  const [start, end] = range;
  for (let i = start; i <= end; i++) {
    if (isSillyInput(i.toString())) {
      sumOfSillyIds += i;
    }
  }
}

console.log("Sum of silly ids:", sumOfSillyIds);

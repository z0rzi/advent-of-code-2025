import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n").map((line) => line);
const redTilesPos = lines.map((line) => line.split(",").map(Number));

// Brute force
let maxArea = 0;
for (let i = 0; i < redTilesPos.length; i++) {
  for (let j = i + 1; j < redTilesPos.length; j++) {
    const area =
      (Math.abs(redTilesPos[i][0] - redTilesPos[j][0]) + 1) *
      (Math.abs(redTilesPos[i][1] - redTilesPos[j][1]) + 1);
    if (area > maxArea) maxArea = area;
  }
}
console.log("Max area:", maxArea);

import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n").map((line) => line.trim().split(/\s+/));
const operations = lines.pop();

if (!operations) {
  throw new Error("No operations");
}

let total = 0;
for (let i = 0; i < operations.length; i++) {
  const isPlus = operations[i] === "+";
  let result = isPlus ? 0 : 1;
  for (const line of lines) {
    if (isPlus) {
      result += +(line[i]);
    } else {
      result *= +(line[i]);
    }
  }
  total += result;
}

console.log("Part 1:", total);

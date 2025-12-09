import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");
const operations = lines.pop();

if (!operations) {
  throw new Error("No operations");
}

lines.reverse();

const longestLine = Math.max(...lines.map((line) => line.length));

let operationParts = [] as number[];
let total = 0;
for (let col = longestLine - 1; col >= -1; col--) {
  let factor = 0;
  let current = 0;
  for (const line of lines) {
    if (line[col] && line[col] !== " ") {
      current += +line[col] * Math.pow(10, factor);
      factor++;
    }
  }
  if (current === 0) {
    // End of the column
    const operation = operations[col + 1];
    if (!operation.trim()) {
      throw new Error("The operation is missing...");
    }
    let result = 0;
    if (operation === "+") {
      result = operationParts.reduce((a, b) => a + b, 0);
    } else if (operation === "*") {
      result = operationParts.reduce((a, b) => a * b, 1);
    } else {
      throw new Error("Unknown operation - " + operation);
    }
    total += result;
    operationParts = [];
  } else {
    operationParts.push(current);
  }
}

console.log("🐽", total);

#!/usr/bin/env bun

import fs from "fs/promises";
import { parseRotations } from "./shared";

/**
 * Calculates the number of passages by zeros from the raw rotations.
 *
 * @param rawRotations The raw rotations in the following format:
 * ```
 * R90
 * L32
 * R129
 * L19
 * L58
 * ...
 * ```
 *
 * @returns The number of times the wheel has passed through a zero.
 */
function countPassagesByZeros(rawRotations: string): number {
  let position = 50;
  let passagesByZero = 0;

  for (let { direction, amount } of parseRotations(rawRotations)) {
    const positionBefore = position;

    while (amount > 100) {
      amount -= 100;
      passagesByZero++;
    }

    if (direction === "R") position += amount;
    else if (direction === "L") position -= amount;
    else throw new Error(`Unknown direction: ${direction}`);

    if (positionBefore > 0 && (position <= 0 || position >= 100)) {
      passagesByZero++;
    }

    position = (position + 100) % 100;
  }

  return passagesByZero;
}

const input = await fs.readFile("./input.txt", "utf-8");
const passagesByZeros = countPassagesByZeros(input.trim());
console.log("Passages by zeros =", passagesByZeros);

#!/usr/bin/env bun

import fs from "fs/promises";
import { parseRotations } from "./shared";

/**
 * Counts the amount of time the wheel falls on a zero after a rotation
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
 * @returns The amount of times the wheel falls on a zero.
 */
function countZeros(rawRotations: string): number {
  let position = 50;
  let amountOfZeros = 0;

  for (const { direction, amount } of parseRotations(rawRotations)) {
    if (direction === "R") position += amount;
    else if (direction === "L") position -= amount;
    else throw new Error(`Unknown direction: ${direction}`);

    position = (position + 100) % 100;
    amountOfZeros += +(position === 0);
  }

  return amountOfZeros;
}

const input = await fs.readFile("./input.txt", "utf-8");
const amount = countZeros(input.trim());
console.log("Amount of zeros =", amount);

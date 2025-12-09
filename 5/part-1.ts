import fs from "fs";

function findFreshIngredients(freshIngredientsRanges: number[][], availableIngredients: number[]) {
    const ingredientsSet = new Set(availableIngredients);
    const freshIds = new Set<number>();

    for (const [from, to] of freshIngredientsRanges) {
        for (const ingredient of ingredientsSet) {
            if (ingredient >= from && ingredient <= to) {
                freshIds.add(ingredient);
                ingredientsSet.delete(ingredient);
            }
        }
    }

    return freshIds;
}

const input = fs.readFileSync("input.txt", "utf8").trim();
const [freshIngredientsRaw, availableIngredientsRaw] = input.split("\n\n");
const freshRanges = freshIngredientsRaw
  .split("\n")
  .map((range) => range.split("-").map(Number));
const availableIngredients = availableIngredientsRaw.split("\n").map(Number);

const freshIngredients = findFreshIngredients(freshRanges, availableIngredients);
console.log('Amount of fresh ingredients:', freshIngredients.size);

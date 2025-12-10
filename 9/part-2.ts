import fs from "fs";

type Point = {
  x: number;
  y: number;
};

class Segment {
  x: number;
  y: number;
}

class HorSegment extends Segment {
  x2: number;

  isVertical = true;

  constructor(x: number, y: number, x2: number) {
    super();
    if (x > x2) [x, x2] = [x2, x];
    this.y = y;
    this.x = x;
    this.x2 = x2;
  }

  collidesWith(other: VertSegment) {
    return other.collidesWith(this);
  }
}

class VertSegment extends Segment {
  y2: number;

  isVertical = false;

  constructor(x: number, y: number, y2: number) {
    super();
    if (y > y2) [y, y2] = [y2, y];
    this.x = x;
    this.y = y;
    this.y2 = y2;
  }

  collidesWith(other: HorSegment) {
    return (
      this.y <= other.y &&
      this.y2 >= other.y &&
      other.x <= this.x &&
      other.x2 >= this.x
    );
  }
}

const input = fs.readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n").map((line) => line);
const redTilesPos = lines.map((line) => {
  const [x, y] = line.split(",").map(Number);
  return { x, y };
});

// Ok, let's think about it.
//
// The easy way would be to create a 2D array of booleans, and check on the map
// for each combination, but the performance would be terrible.
//
// Another way would be to check for collisions between the 4 sides of the rectangle, and every segment.
// The would probably be faster, because no huge map to create, but still pretty heavy.
//
// I could first find all possible squares, without collisions, sort them by area, and then eliminate them starting from the biggest one.
// The first one which works is the winner.

const allPossibleSquares = [] as [Point, Point][];
for (let i = 0; i < redTilesPos.length; i++) {
  for (let j = i + 1; j < redTilesPos.length; j++) {
    let a = redTilesPos[i];
    let b = redTilesPos[j];
    // We make sure that every square is defined by the top left and the bottom right corners
    if (a.x > b.x) [a, b] = [b, a];
    if (a.y > b.y) {
      [a, b] = [
        { x: a.x, y: b.y },
        { x: b.x, y: a.y },
      ];
    }
    allPossibleSquares.push([a, b]);
  }
}
// Sorting by area
allPossibleSquares.sort((a, b) => {
  const area1 =
    (Math.abs(a[0].x - a[1].x) + 1) * (Math.abs(a[0].y - a[1].y) + 1);
  const area2 =
    (Math.abs(b[0].x - b[1].x) + 1) * (Math.abs(b[0].y - b[1].y) + 1);
  return area2 - area1;
});

const vertSegments = [] as VertSegment[];
const horSegments = [] as HorSegment[];
for (let i = 0; i < redTilesPos.length; i++) {
  const pt1 = redTilesPos[i];
  const pt2 = redTilesPos[(i + 1) % redTilesPos.length];
  if (pt1.x === pt2.x) {
    vertSegments.push(new VertSegment(pt1.x, pt1.y, pt2.y));
  } else {
    horSegments.push(new HorSegment(pt1.x, pt1.y, pt2.x));
  }
}

for (const square of allPossibleSquares) {
  /** top left corner */
  const tl = square[0];
  /** bottom right corner */
  const br = square[1];

  // We will check for collisions with the segments **inside** the square.
  const squareVertSegments = [
    new VertSegment(tl.x + 1, tl.y + 1, br.y - 1),
    new VertSegment(br.x - 1, br.y - 1, tl.y + 1),
  ] as VertSegment[];
  const squareHorSegments = [
    new HorSegment(tl.x + 1, tl.y + 1, br.x - 1),
    new HorSegment(br.x - 1, br.y - 1, tl.x + 1),
  ] as HorSegment[];

  let isColliding = false;

  // Checking for collisions with all the segments

  // 1. Vertical segments
  for (const s1 of squareVertSegments) {
    for (const s2 of horSegments) {
      if (s1.collidesWith(s2)) {
        isColliding = true;
        break;
      }
    }
    if (isColliding) break;
  }
  if (isColliding) continue;

  // 2. Horizontal segments
  for (const s1 of squareHorSegments) {
    for (const s2 of vertSegments) {
      if (s1.collidesWith(s2)) {
        isColliding = true;
        break;
      }
    }
    if (isColliding) break;
  }
  if (isColliding) continue;

  // No collisions! We found the best square!
  const area = (Math.abs(tl.x - br.x) + 1) * (Math.abs(tl.y - br.y) + 1);
  console.log("Best square:", square);
  console.log("Max area:", area);
  process.exit(0);
}

console.log('No solution found...');

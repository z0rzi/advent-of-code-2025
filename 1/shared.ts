export type Rotation = {
  direction: "L" | "R";
  amount: number;
};

export function* parseRotations(rawRotations: string): Generator<Rotation> {
    const lines = rawRotations.split("\n");

    for (const line of lines) {
        const direction = line.charAt(0) as 'L' | 'R';
        const amount = +(line.slice(1));

        yield { direction, amount };
    }
}


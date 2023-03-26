import { Challenge } from "../classes/challenge";

const challenge1: Challenge = new Challenge(
  1,
  "Reto Extremo",
  [2, 4, 15],
  "Running",
  60,
  ["pepaso", "fredo", "tortugo93", "francisca", "pepapi", "cupcake"]
);

const challenge2: Challenge = new Challenge(
  2,
  "Turboreto",
  [1, 2],
  "Running",
  20,
  ["davidsote", "cupcake"]
);

const challenge3: Challenge = new Challenge(
  3,
  "Tarta",
  [777, 21, 90],
  "Bicycle",
  500,
  ["tomasote", "miau", "irene123", "elpepe"]
);

export const challengeExample = [challenge1, challenge2, challenge3];

import { Challenge } from "../classes/challenge";

const challenge1: Challenge = new Challenge(
  1,
  "Reto Extremo",
  [2, 4, 5],
  "Running",
  60,
  ["pepaso", "rodrigodigo"]
);

const challenge2: Challenge = new Challenge(
  2,
  "Turboreto",
  [1, 2],
  "Bicycle",
  20,
  ["marcelo"]
);

const challenge3: Challenge = new Challenge(
  3,
  "Tarta",
  [8, 9, 10, 11],
  "Bicycle",
  500,
  ["marcelo", "tomasote", "cupcake"]
);

export const challengeExample = [challenge1, challenge2, challenge3];

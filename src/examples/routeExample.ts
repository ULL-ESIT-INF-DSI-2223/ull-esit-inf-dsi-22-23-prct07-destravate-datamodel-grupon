import { Route } from "../classes/route";
import { Coord } from "../classes/coord";

const r1 = new Route(
  0,
  "Ruta1",
  new Coord(1, 1),
  new Coord(2, 2),
  1,
  1,
  ["irene123"],
  "Running",
  9
);

const r2 = new Route(
  1,
  "Ruta2",
  new Coord(1, 1),
  new Coord(3, 3),
  2,
  2,
  ["pepaso", "alehandro", "frigopie"],
  "Running",
  0
);

const r3 = new Route(
  2,
  "Ruta3",
  new Coord(1, 1),
  new Coord(4, 4),
  3,
  3,
  ["saulin", "alehandro", "tortugo93", "picolo", "frifayar"],
  "Running",
  3
);

const r4 = new Route(
  3,
  "Ruta4",
  new Coord(1, 1),
  new Coord(5, 5),
  4,
  4,
  ["tomasote", "miau", "francisca", "pepapi"],
  "Running",
  4
);

const r5 = new Route(
  4,
  "Ruta5",
  new Coord(1, 1),
  new Coord(6, 6),
  5,
  5,
  ["davidsote", "fredo", "frifayar", "cupcake", "elpepe"],
  "Running",
  10
);

const r6 = new Route(
  15,
  "Ruta52",
  new Coord(1, 1),
  new Coord(62, 16),
  100,
  5,
  ["rodrigodigo", "pedrillo", "davidsote", "lucaspelucas", "miau", "fredo"],
  "Running",
  3
);

const r7 = new Route(
  777,
  "Ruta53",
  new Coord(1, 1),
  new Coord(62, 16),
  100,
  5,
  ["lucaspelucas"],
  "Bicycle",
  3
);

const r8 = new Route(
  20,
  "Ruta77",
  new Coord(1, 1),
  new Coord(62, 16),
  100,
  5,
  ["tomasote", "pedrillo", "picolo", "cupcake", "elpepe"],
  "Running",
  4
);

const r9 = new Route(
  21,
  "Ruta21",
  new Coord(1, 1),
  new Coord(62, 16),
  1000,
  2,
  ["saulin", "rodrigodigo", "pepapi", "fritanga"],
  "Bicycle",
  6
);

const r10 = new Route(
  90,
  "Ruta90",
  new Coord(1, 1),
  new Coord(62, 16),
  500,
  2,
  [],
  "Bicycle",
  3
);

export const routeExample = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10];

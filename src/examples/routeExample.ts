import { Route } from "../classes/route";
import { Coord } from "../classes/coord";
const r1 = new Route(
  0,
  "Ruta1",
  new Coord(1, 1),
  new Coord(2, 2),
  1,
  1,
  [],
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
  ["usu1"],
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
  ["usu2", "usu3"],
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
  ["usu2", "usu3", "usu4", "usu5", "usu7"],
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
  ["usu2", "usu3", "usu5"],
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
  ["usu2", "usu3", "usu5", "usu1231", "usu2121", "usu52112", "usu"],
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
  ["usu2", "usu3", "usu5", "usu4"],
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
  ["usu2", "usu3", "usu5", "usu6", "usu51", "usu12211"],
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
  ["usu2", "usu3", "usu5", "usu1231", "usu2121", "usu52112", "usu", "u"],
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
  ["usu2", "usu3", "usu5", "usu1231", "usu2121", "usu52112", "usu", "u", "a"],
  "Bicycle",
  3
);

export const routeExample1 = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10];

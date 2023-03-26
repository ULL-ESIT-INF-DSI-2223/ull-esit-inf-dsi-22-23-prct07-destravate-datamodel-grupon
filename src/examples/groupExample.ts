import { Group } from "../classes/group";
import { userExample } from "./userExample";

// Fichero de recuperación en caso de que se borren los grupos de la base de datos

const g1 = new Group(
  1,
  "Grupo1",
  [userExample[0]],
  [15, 0],
  [
    [new Date("2021-10-17T03:24:00"), 0],
    [new Date("2021-10-13T03:24:00"), 15],
  ]
);

const g2 = new Group(
  2,
  "Grupo2",
  [userExample[2], userExample[3]],
  [2, 4],
  [
    [new Date("2018-10-17T03:24:00"), 2],
    [new Date("2020-01-13T03:24:00"), 4],
  ]
);

const g3 = new Group(
  3,
  "Grupo3",
  [userExample[4], userExample[5]],
  [777],
  [[new Date("2020-03-21T03:24:00"), 777]]
);

const g4 = new Group(
  4,
  "Cuatro",
  [userExample[6], userExample[7]],
  [20, 21],
  [
    [new Date("2013-10-17T03:24:00"), 20],
    [new Date("2010-03-21T03:24:00"), 21],
  ]
);

const g5 = new Group(
  5,
  "Grupo5",
  [userExample[8], userExample[9], userExample[10]],
  [0, 1],
  [
    [new Date("2015-10-17T03:24:00"), 0],
    [new Date("2011-03-21T03:24:00"), 1],
  ]
);

export const groupExample = [g1, g2, g3, g4, g5];

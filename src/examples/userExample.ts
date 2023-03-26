import { User } from "../classes/user";
import { Statistics } from "../classes/statistics";

const user1: User = new User(
  "pepaso",
  "Pepe",
  "Running",
  [
    "rodrigodigo",
    "tomasote",
    "saulin",
    "pedrillo",
    "pepapi",
    "picolo",
    "elpepe",
  ],
  [1],
  new Statistics(5, 200, 10, 500, 50, 4000),
  [15, 4],
  [1],
  [[new Date("2022-12-17T03:24:00"), 4]]
);

const user2: User = new User(
  "tomasote",
  "Tomás",
  "Bicycle",
  ["pepaso", "saulin", "pedrillo"],
  [2],
  new Statistics(5, 250, 15, 600, 80, 5500),
  [15, 4, 20],
  [3],
  [
    [new Date("2021-12-17T03:24:00"), 4],
    [new Date("2022-12-17T03:24:00"), 20],
  ]
);

const user3: User = new User(
  "saulin",
  "Saúl",
  "Bicycle",
  ["pepaso", "tomasote", "davidsote", "alehandro"],
  [2],
  new Statistics(15, 250, 20, 600, 90, 5500),
  [2, 21],
  [],
  [
    [new Date("2022-12-17T03:24:00"), 2],
    [new Date("2023-01-18T03:24:00"), 21],
  ]
);

const user4: User = new User(
  "rodrigodigo",
  "Rodrigo",
  "Running",
  ["saulin", "pepaso", "davidsote"],
  [2],
  new Statistics(26, 25, 65, 600, 120, 5500),
  [15],
  [],
  [
    [new Date("2021-12-17T03:24:00"), 15],
    [new Date("2022-12-17T03:24:00"), 21],
  ]
);

const user5: User = new User(
  "pedrillo",
  "Pedro",
  "Bicycle",
  ["pepaso", "tomasote"],
  [3],
  new Statistics(6, 250, 12, 600, 70, 5500),
  [15, 20],
  [],
  [
    [new Date("2022-12-17T03:24:00"), 15],
    [new Date("2020-10-15T03:24:00"), 20],
  ]
);

const user6: User = new User(
  "davidsote",
  "David",
  "Running",
  ["rodrigodigo", "saulin", "lucaspelucas", "frigopie"],
  [3],
  new Statistics(9, 250, 45, 600, 120, 5500),
  [15, 4],
  [2],
  [
    [new Date("2022-12-17T03:24:00"), 4],
    [new Date("2019-08-04T03:24:00"), 15],
  ]
);

const user7: User = new User(
  "lucaspelucas",
  "Lucas",
  "Bicycle",
  ["davidsote", "miau"],
  [4],
  new Statistics(24, 250, 95, 600, 1230, 5500),
  [15, 777],
  [],
  [
    [new Date("2022-12-17T03:24:00"), 15],
    [new Date("2022-12-17T03:24:00"), 777],
  ]
);

const user8: User = new User(
  "alehandro",
  "Alejandro",
  "Bicycle",
  ["saulin"],
  [4],
  new Statistics(1, 250, 2, 600, 3, 5500),
  [1, 2, 20],
  [],
  [
    [new Date("2022-12-17T03:24:00"), 1],
    [new Date("2004-01-12T03:24:00"), 2],
  ]
);

const user9: User = new User(
  "miau",
  "Miau",
  "Bicycle",
  ["lucaspelucas"],
  [5],
  new Statistics(1, 250, 1, 600, 1, 5500),
  [15, 4],
  [3],
  [
    [new Date("2022-12-17T03:24:00"), 15],
    [new Date("2021-11-07T03:24:00"), 3],
  ]
);

const user10: User = new User(
  "fredo",
  "Alfredo",
  "Running",
  [],
  [5],
  new Statistics(12, 250, 15, 600, 60, 5500),
  [15, 4],
  [1],
  [
    [new Date("2022-12-17T03:24:00"), 4],
    [new Date("2020-11-17T03:24:00"), 15],
  ]
);

const user11: User = new User(
  "frigopie",
  "Sergio",
  "Bicycle",
  ["davidsote"],
  [5],
  new Statistics(4, 250, 11, 600, 40, 5500),
  [1],
  [],
  [[new Date("2022-12-17T03:24:00"), 1]]
);

const user12: User = new User(
  "tortugo93",
  "Tito",
  "Bicycle",
  ["francisca"],
  [],
  new Statistics(8, 250, 16, 600, 80, 5500),
  [2, 4],
  [1],
  [[new Date("2020-11-16T03:24:00"), 2]]
);

const user13: User = new User(
  "francisca",
  "Francisca",
  "Running",
  ["tortugo93", "irene123"],
  [],
  new Statistics(14, 250, 15, 600, 16, 5500),
  [3, 20],
  [1],
  [[new Date("2018-11-15T03:25:00"), 3]]
);

const user14: User = new User(
  "irene123",
  "Irene",
  "Bicycle",
  ["francisca"],
  [],
  new Statistics(2, 250, 69, 600, 420, 5500),
  [4, 2, 0],
  [3],
  [[new Date("2001-09-11T03:24:00"), 0]]
);

const user15: User = new User(
  "pepapi",
  "Pepa",
  "Running",
  ["pepaso"],
  [],
  new Statistics(0, 250, 0, 600, 10, 5500),
  [777, 4, 21],
  [1],
  [
    [new Date("2022-12-17T03:24:00"), 4],
    [new Date("2022-12-17T03:24:00"), 21],
  ]
);

const user16: User = new User(
  "fritanga",
  "Frigoadri",
  "Bicycle",
  ["picolo"],
  [],
  new Statistics(2, 250, 9, 600, 85, 5500),
  [21, 1],
  [],
  [[new Date("2019-02-12T03:24:00"), 21]]
);

const user17: User = new User(
  "picolo",
  "Picopico",
  "Running",
  ["pepaso", "fritanga", "frifayar"],
  [],
  new Statistics(23, 250, 64, 600, 182, 5500),
  [21, 20],
  [],
  [
    [new Date("2015-11-12T03:24:00"), 20],
    [new Date("2016-12-05T03:24:00"), 2],
  ]
);

const user18: User = new User(
  "frifayar",
  "Frifro",
  "Bicycle",
  ["picolo", "elpepe"],
  [],
  new Statistics(10, 250, 25, 600, 50, 5500),
  [15, 20],
  [],
  [
    [new Date("2020-12-17T03:24:00"), 4],
    [new Date("2022-12-17T03:24:00"), 2],
  ]
);

const user19: User = new User(
  "cupcake",
  "Pitbull",
  "Running",
  [],
  [],
  new Statistics(27, 250, 30, 600, 35, 5500),
  [15, 4, 20],
  [1, 2],
  [
    [new Date("2021-12-17T03:24:00"), 4],
    [new Date("2022-12-17T03:24:00"), 20],
  ]
);

const user20: User = new User(
  "elpepe",
  "Pepe",
  "Bicycle",
  ["pepaso", "frifayar"],
  [],
  new Statistics(15, 250, 16, 600, 12000, 5500),
  [15, 4, 20],
  [3],
  [
    [new Date("2021-12-17T03:24:00"), 4],
    [new Date("2022-12-17T03:24:00"), 20],
  ]
);

export const userExample = [
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
  user10,
  user11,
  user12,
  user13,
  user14,
  user15,
  user16,
  user17,
  user18,
  user19,
  user20,
];

import "mocha";
import { expect } from "chai";
import { Challenge } from "../src/classes/challenge";
import { Route } from "../src/classes/route";
import { User } from "../src/classes/user";
import { Statistics } from "../src/classes/statistics";
import { Coord } from "../src/classes/coord";

describe("Challenge class tests", () => {
  it("Challenge constructor", () => {
    expect(
      new Challenge(
        1,
        "Reto Extremo",
        [2, 4, 5],
        "Running",
        60,
        ["pepaso", "rodrigodigo"]
      )
    ).to.be.instanceof(Challenge);
    expect(
      () =>
        new Challenge(
          -1,
          "Reto Extremo",
          [2, 4, 5],
          "Running",
          60,
          ["pepaso", "rodrigodigo"]
        )
    ).to.throw("ID del reto no válido");
    expect(
      () =>
        new Challenge(
          1.5,
          "Reto Extremo",
          [2, 4, 5],
          "Running",
          60,
          ["pepaso", "rodrigodigo"]
        )
    ).to.throw("ID del reto no válido");
    expect(
      () =>
        new Challenge(
          1,
          "Reto Extremo",
          [-2, 4, 5],
          "Running",
          60,
          ["pepaso", "rodrigodigo"]
        )
    ).to.throw("ID -2 de ruta no válido");
    expect(
      () =>
        new Challenge(
          1,
          "Reto Extremo",
          [2, 4.5, 5],
          "Running",
          60,
          ["pepaso", "rodrigodigo"]
        )
    ).to.throw("ID 4.5 de ruta no válido");
    expect(
      () =>
        new Challenge(
          1,
          "Reto Extremo",
          [2, 4, 5],
          "Running",
          -10,
          ["pepaso", "rodrigodigo"]
        )
    ).to.throw("El total de kilómetros debe ser positivo");
  });

  it("id property", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5],
      "Running",
      60,
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.id).to.be.equal(1);
    challenge.id = 3;
    expect(challenge.id).to.be.equal(3);
    expect(() => (challenge.id = -1)).to.throw("ID del reto no válido");
    expect(() => (challenge.id = 1.5)).to.throw("ID del reto no válido");
  });

  it("name property", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5],
      "Running",
      60,
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.name).to.be.equal("Reto Extremo");
    challenge.name = "Transvulcania";
    expect(challenge.name).to.be.equal("Transvulcania");
  });

  it("routes property", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5],
      "Running",
      60,
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.routes).to.be.eql([2, 4, 5]);
    challenge.routes = [7, 8];
    expect(challenge.routes).to.be.eql([7, 8]);
    expect(() => (challenge.routes = [-1, 4, 5])).to.throw(
      "ID -1 de ruta no válido"
    );
    expect(() => (challenge.routes = [2, 4.5, 5])).to.throw(
      "ID 4.5 de ruta no válido"
    );
  });

  it("addRoute function", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5],
      "Running",
      60,
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.addRoute(7)).to.be.true;
    expect(challenge.routes).to.be.eql([2, 4, 5, 7]);
    expect(challenge.addRoute(new Route(8, "Las Cañadas", new Coord(20.3, -2.2), new Coord(20.4, -2.0), 2000, 200, ["pepaso", "rodrigodigo"], "Running", 200))).to.be.true;
    expect(challenge.routes).to.be.eql([2, 4, 5, 7, 8]);
    expect(challenge.addRoute(-1)).to.be.false;
    expect(challenge.addRoute(6.5)).to.be.false;
    expect(challenge.addRoute(5)).to.be.false;
    expect(challenge.addRoute(new Route(7, "Cruz del Carmen - Punta del Hidalgo", new Coord(21.3, -1.2), new Coord(20.9, -1.8), 10000, 1000, ["pepaso", "marcelo"], "Running", 150))).to.be.false;
  });

  it("removeRoute function", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5, 7, 8],
      "Running",
      60,
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.removeRoute(7)).to.be.true;
    expect(challenge.routes).to.be.eql([2, 4, 5, 8]);
    expect(challenge.removeRoute(new Route(8, "Las Cañadas", new Coord(20.3, -2.2), new Coord(20.4, -2.0), 2000, 200, ["pepaso", "rodrigodigo"], "Running", 200))).to.be.true;
    expect(challenge.routes).to.be.eql([2, 4, 5]);
    expect(challenge.removeRoute(8)).to.be.false;
    expect(challenge.removeRoute(new Route(7, "Cruz del Carmen - Punta del Hidalgo", new Coord(21.3, -1.2), new Coord(20.9, -1.8), 10000, 1000, ["pepaso", "marcelo"], "Running", 150))).to.be.false;
  });

  it("activity property", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5],
      "Running",
      60,
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.activity).to.be.equal("Running");
    challenge.activity = "Bicycle";
    expect(challenge.activity).to.be.equal("Bicycle");
  });

  it("total_kilometers property", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5],
      "Running",
      60,
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.total_kilometers).to.be.equal(60);
    challenge.total_kilometers = 75.5;
    expect(challenge.total_kilometers).to.be.equal(75.5);
    expect(() => (challenge.total_kilometers = -10)).to.throw(
      "El total de kilómetros debe ser positivo"
    );
  });

  it("users property", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5],
      "Running",
      60,
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.users).to.be.eql(
      ["pepaso", "rodrigodigo"]
    );
    challenge.users = ["alfredillo", "tomasote"];
    expect(challenge.users).to.be.eql(
      ["alfredillo", "tomasote"]
    );
  });

  it("addUser function", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5],
      "Running",
      60,
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.addUser("alfredillo")).to.be.true;
    expect(challenge.users).to.be.eql(
      ["pepaso", "rodrigodigo", "alfredillo"]
    );
    expect(
      challenge.addUser(
        new User(
          "tomasote",
          "Tomás",
          "Bicycle",
          ["pepaso", "marcelo"],
          [2, 4],
          new Statistics(5, 250, 15, 600, 80, 5500),
          [6, 4, 8],
          [1, 3, 4],
          [
            [new Date(), 4],
            [new Date("2022-12-17T03:24:00"), 2],
          ]
        )
      )
    ).to.be.true;
    expect(challenge.users).to.be.eql(
      ["pepaso", "rodrigodigo", "alfredillo", "tomasote"]
    );
    expect(challenge.addUser("pepaso")).to.be.false;
    expect(
      challenge.addUser(
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [2, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4],
          [1, 3],
          [[new Date(), 4]]
        )
      )
    ).to.be.false;
  });

  it("removeUser function", () => {
    const challenge: Challenge = new Challenge(
      1,
      "Reto Extremo",
      [2, 4, 5],
      "Running",
      60,
      ["pepaso", "rodrigodigo", "alfredillo", "tomasote"]
    );
    expect(challenge.removeUser("alfredillo")).to.be.true;
    expect(challenge.users).to.be.eql(
      ["pepaso", "rodrigodigo", "tomasote"]
    );
    expect(
      challenge.removeUser(
        new User(
          "tomasote",
          "Tomás",
          "Bicycle",
          ["pepaso", "marcelo"],
          [2, 4],
          new Statistics(5, 250, 15, 600, 80, 5500),
          [6, 4, 8],
          [1, 3, 4],
          [
            [new Date(), 4],
            [new Date("2022-12-17T03:24:00"), 2],
          ]
        )
      )
    ).to.be.true;
    expect(challenge.users).to.be.eql(
      ["pepaso", "rodrigodigo"]
    );
    expect(challenge.removeUser("alfredillo")).to.be.false;
    expect(
      challenge.removeUser(
        new User(
          "tomasote",
          "Tomás",
          "Bicycle",
          ["pepaso", "marcelo"],
          [2, 4],
          new Statistics(5, 250, 15, 600, 80, 5500),
          [6, 4, 8],
          [1, 3, 4],
          [
            [new Date(), 4],
            [new Date("2022-12-17T03:24:00"), 2],
          ]
        )
      )
    ).to.be.false;
  });
});

import "mocha";
import { expect } from "chai";
import { User } from "../src/classes/user";
import { Statistics } from "../src/classes/statistics";
import { Group } from "../src/classes/group";
import { Route } from "../src/classes/route";
import { Challenge } from "../src/classes/challenge";
import { Coord } from "../src/classes/coord";

/**
 *
 * Clase que representa un usuario
 * Atributos
 *  id - ID único del usuario
 *  name_ - Nombre del grupo.
 *  participants_ids_ - Colleción de IDs de usuarios miembros del grupo.
 *
 */
describe("User class tests", () => {
  it("User constructor", () => {
    expect(
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
    ).to.be.instanceof(User);
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["pepaso", "marcelo"],
          [2, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4],
          [1, 3],
          [[new Date(), 4]]
        )
    ).to.throw("Un usuario no puede ser amigo de sí mismo");
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [-1, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4],
          [1, 3],
          [[new Date(), 4]]
        )
    ).to.throw("ID -1 de grupo no válido");
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [2, 5.5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4],
          [1, 3],
          [[new Date(), 4]]
        )
    ).to.throw("ID 5.5 de grupo no válido");
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [2, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [-6, 4],
          [1, 3],
          [[new Date(), 4]]
        )
    ).to.throw("ID -6 de ruta no válido");
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [2, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4.5],
          [1, 3],
          [[new Date(), 4]]
        )
    ).to.throw("ID 4.5 de ruta no válido");
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [2, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4],
          [-1, 3],
          [[new Date(), 4]]
        )
    ).to.throw("ID -1 de reto no válido");
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [2, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4],
          [1, 3.5],
          [[new Date(), 4]]
        )
    ).to.throw("ID 3.5 de reto no válido");
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [2, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4],
          [1, 3],
          [[new Date("2025-12-17T03:24:00"), 4]]
        )
    ).to.throw("La fecha de una ruta del historial no puede ser futura");
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [2, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4],
          [1, 3],
          [[new Date(), -1]]
        )
    ).to.throw("ID -1 de ruta del historial no válido");
    expect(
      () =>
        new User(
          "pepaso",
          "Pepe",
          "Running",
          ["rodrigodigo", "marcelo"],
          [2, 5],
          new Statistics(5, 200, 10, 500, 50, 4000),
          [6, 4],
          [1, 3],
          [[new Date(), 4.5]]
        )
    ).to.throw("ID 4.5 de ruta del historial no válido");
  });

  it("id property", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.id).to.be.equal("pepaso");
    user.id = "pepase";
    expect(user.id).to.be.equal("pepase");
  });

  it("name property", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.name).to.be.equal("Pepe");
    user.name = "José";
    expect(user.name).to.be.equal("José");
  });

  it("activity property", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.activity).to.be.equal("Running");
    user.activity = "Bicycle";
    expect(user.activity).to.be.equal("Bicycle");
  });

  it("friends property", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.friends).to.be.eql(["rodrigodigo", "marcelo"]);
    user.friends = ["alfredillo", "tomasote"];
    expect(user.friends).to.be.eql(["alfredillo", "tomasote"]);
    expect(
      () => (user.friends = ["pepaso", "tomasote"])
    ).to.throw("Un usuario no puede ser amigo de sí mismo");
  });

  it("addFriend function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.addFriend("alfredillo")).to.be.true;
    expect(user.friends).to.be.eql(
      ["rodrigodigo", "marcelo", "alfredillo"]
    );
    expect(
      user.addFriend(
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
    expect(user.friends).to.be.eql(
      ["rodrigodigo", "marcelo", "alfredillo", "tomasote"]
    );
    expect(user.addFriend("pepaso")).to.be.false;
    expect(user.addFriend("rodrigodigo")).to.be.false;
    expect(
      user.addFriend(
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
    expect(
      user.addFriend(
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

  it("removeFriend function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo", "alfredillo", "tomasote"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.removeFriend("alfredillo")).to.be.true;
    expect(user.friends).to.be.eql(
      ["rodrigodigo", "marcelo", "tomasote"]
    );
    expect(
      user.removeFriend(
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
    expect(user.friends).to.be.eql(["rodrigodigo", "marcelo"]);
    expect(user.removeFriend("alfredillo")).to.be.false;
    expect(
      user.removeFriend(
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

  it("groups property", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.groups).to.be.eql([2, 5]);
    user.groups = [7, 8];
    expect(user.groups).to.be.eql([7, 8]);
    expect(() => (user.groups = [-1, 5])).to.throw(
      "ID -1 de grupo no válido"
    );
    expect(() => (user.groups = [2, 5.5])).to.throw(
      "ID 5.5 de grupo no válido"
    );
  });

  it("addGroup function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.addGroup(7)).to.be.true;
    expect(user.groups).to.be.eql([2, 5, 7]);
    expect(user.addGroup(new Group(8, "Grupo 8", [user, new User(
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
    )], [2, 3, 4], [[new Date(), 4],
    [new Date("2022-12-17T03:24:00"), 2],
    [new Date("2021-08-12T03:24:00"), 3]]))).to.be.true;
    expect(user.groups).to.be.eql([2, 5, 7, 8]);
    expect(user.addGroup(-1)).to.be.false;
    expect(user.addGroup(5.5)).to.be.false;
    expect(user.addGroup(5)).to.be.false;
    expect(user.addGroup(new Group(7, "Grupo 7", [user, new User(
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
    )], [2, 3, 4], [[new Date(), 4],
    [new Date("2022-12-17T03:24:00"), 2],
    [new Date("2021-08-12T03:24:00"), 3]]))).to.be.false;
  });

  it("removeGroup function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5, 7, 8],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.removeGroup(7)).to.be.true;
    expect(user.groups).to.be.eql([2, 5, 8]);
    expect(user.removeGroup(new Group(8, "Grupo 8", [user, new User(
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
    )],  [2, 3, 4], [[new Date(), 4],
    [new Date("2022-12-17T03:24:00"), 2],
    [new Date("2021-08-12T03:24:00"), 3]]))).to.be.true;
    expect(user.groups).to.be.eql([2, 5]);
    expect(user.removeGroup(8)).to.be.false;
    expect(user.removeGroup(new Group(7, "Grupo 7", [user, new User(
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
    )], [2, 3, 4], [[new Date(), 4],
    [new Date("2022-12-17T03:24:00"), 2],
    [new Date("2021-08-12T03:24:00"), 3]]))).to.be.false;
  });

  it("statistics property", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.statistics).to.be.eql(
      new Statistics(5, 200, 10, 500, 50, 4000)
    );
    user.statistics = new Statistics(8, 250, 12, 400, 60, 3000);
    expect(user.statistics).to.be.eql(
      new Statistics(8, 250, 12, 400, 60, 3000)
    );
  });

  it("favourite_routes property", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.favourite_routes).to.be.eql([6, 4]);
    user.favourite_routes = [7, 8];
    expect(user.favourite_routes).to.be.eql([7, 8]);
    expect(() => (user.favourite_routes = [-1, 4])).to.throw(
      "ID -1 de ruta no válido"
    );
    expect(() => (user.favourite_routes = [6, 4.5])).to.throw(
      "ID 4.5 de ruta no válido"
    );
  });

  it("addFavouriteRoute function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.addFavouriteRoute(7)).to.be.true;
    expect(user.favourite_routes).to.be.eql([6, 4, 7]);
    expect(user.addFavouriteRoute(new Route(8, "Las Cañadas", new Coord(20.3, -2.2), new Coord(20.4, -2.0), 2000, 200, ["pepaso", "rodrigodigo"], "Running", 200))).to.be.true;
    expect(user.favourite_routes).to.be.eql([6, 4, 7, 8]);
    expect(user.addFavouriteRoute(-1)).to.be.false;
    expect(user.addFavouriteRoute(6.5)).to.be.false;
    expect(user.addFavouriteRoute(6)).to.be.false;
    expect(user.addFavouriteRoute(new Route(7, "Cruz del Carmen - Punta del Hidalgo", new Coord(21.3, -1.2), new Coord(20.9, -1.8), 10000, 1000, ["pepaso", "marcelo"], "Running", 150))).to.be.false;
  });

  it("removeFavouriteRoute function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4, 7, 8],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.removeFavouriteRoute(7)).to.be.true;
    expect(user.favourite_routes).to.be.eql([6, 4, 8]);
    expect(user.removeFavouriteRoute(new Route(8, "Las Cañadas", new Coord(20.3, -2.2), new Coord(20.4, -2.0), 2000, 200, ["pepaso", "rodrigodigo"], "Running", 200))).to.be.true;
    expect(user.favourite_routes).to.be.eql([6, 4]);
    expect(user.removeFavouriteRoute(8)).to.be.false;
    expect(user.removeFavouriteRoute(new Route(7, "Cruz del Carmen - Punta del Hidalgo", new Coord(21.3, -1.2), new Coord(20.9, -1.8), 10000, 1000, ["pepaso", "marcelo"], "Running", 150))).to.be.false;
  });

  it("active_challenges property", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.active_challenges).to.be.eql([1, 3]);
    user.active_challenges = [2, 4];
    expect(user.active_challenges).to.be.eql([2, 4]);
    expect(() => (user.active_challenges = [-1, 3])).to.throw(
      "ID -1 de reto no válido"
    );
    expect(() => (user.active_challenges = [1, 3.5])).to.throw(
      "ID 3.5 de reto no válido"
    );
  });

  it("addActiveChallenge function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.addActiveChallenge(7)).to.be.true;
    expect(user.active_challenges).to.be.eql([1, 3, 7]);
    expect(
      user.addActiveChallenge(
        new Challenge(
          8,
          "Reto Extremo",
          [2, 4, 5],
          "Running",
          60,
          ["pepaso", "rodrigodigo"]
        )
      )
    ).to.be.true;
    expect(user.active_challenges).to.be.eql([1, 3, 7, 8]);
    expect(user.addActiveChallenge(-1)).to.be.false;
    expect(user.addActiveChallenge(1.5)).to.be.false;
    expect(user.addActiveChallenge(1)).to.be.false;
    expect(
      user.addActiveChallenge(
        new Challenge(
          1,
          "Reto Extremo",
          [2, 4, 5],
          "Running",
          60,
          ["pepaso", "rodrigodigo"]
        )
      )
    ).to.be.false;
  });

  it("removeActiveChallenge function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3, 7, 8],
      [[new Date(), 4]]
    );
    expect(user.removeActiveChallenge(7)).to.be.true;
    expect(user.active_challenges).to.be.eql([1, 3, 8]);
    expect(
      user.removeActiveChallenge(
        new Challenge(
          8,
          "Reto Extremo",
          [2, 4, 5],
          "Running",
          60,
          ["pepaso", "rodrigodigo"]
        )
      )
    ).to.be.true;
    expect(user.active_challenges).to.be.eql([1, 3]);
    expect(user.removeActiveChallenge(8)).to.be.false;
    expect(
      user.removeActiveChallenge(
        new Challenge(
          7,
          "Reto Extremo",
          [2, 4, 5],
          "Running",
          60,
          ["pepaso", "rodrigodigo"]
        )
      )
    ).to.be.false;
  });

  it("historical property", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    expect(user.historical).to.be.eql(
      [[new Date(), 4]]
    );
    user.historical = [
      [new Date("2022-12-17T03:24:00"), 5],
    ];
    expect(user.historical).to.be.eql(
      [[new Date("2022-12-17T03:24:00"), 5]]
    );
    expect(
      () =>
        user.historical = [
          [new Date("2025-12-17T03:24:00"), 2],
        ]
    ).to.throw("La fecha de una ruta del historial no puede ser futura");
    expect(
      () => user.historical = [[new Date(), -1]]
    ).to.throw("ID -1 de ruta del historial no válido");
    expect(
      () => user.historical = [[new Date(), 5.5]]
    ).to.throw("ID 5.5 de ruta del historial no válido");
  });

  it("addRouteToHistorical function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3],
      [[new Date("2020-11-16T02:21:00"), 4]]
    );
    expect(user.addRouteToHistorical(new Date("2022-12-17T03:24:00"), 2)).to.be
      .true;
    expect(user.historical).to.be.eql(
      [
        [new Date("2020-11-16T02:21:00"), 4],
        [new Date("2022-12-17T03:24:00"), 2],
      ]
    );
    expect(user.addRouteToHistorical(new Date('2021-08-12T03:24:00'), new Route(3, "El Teide", new Coord(21.3, -2.2), new Coord(20.4, -2.0), 3000, 200, ["pepaso", "rodrigodigo"], "Bicycle", 200))).to.be.true;
    expect(user.historical).to.be.eql(
      [
        [new Date("2020-11-16T02:21:00"), 4],
        [new Date("2022-12-17T03:24:00"), 2],
        [new Date("2021-08-12T03:24:00"), 3],
      ]
    );
    expect(user.addRouteToHistorical(new Date("2022-12-17T03:24:00"), -1)).to.be
      .false;
    expect(user.addRouteToHistorical(new Date("2022-12-17T03:24:00"), 2.5)).to
      .be.false;
  });

  it("removeRouteFromHistorical function", () => {
    const user: User = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 50, 4000),
      [6, 4],
      [1, 3, 7, 8],
      [
        [new Date("2020-11-16T02:21:00"), 4],
        [new Date("2022-12-17T03:24:00"), 2],
        [new Date("2021-08-12T03:24:00"), 3],
      ]
    );
    expect(user.removeRouteFromHistorical(new Date("2022-12-17T03:24:00"), 2))
      .to.be.true;
    expect(user.historical).to.be.eql(
      [
        [new Date("2020-11-16T02:21:00"), 4],
        [new Date("2021-08-12T03:24:00"), 3],
      ]
    );
    expect(user.removeRouteFromHistorical(new Date('2021-08-12T03:24:00'), new Route(3, "El Teide", new Coord(21.3, -2.2), new Coord(20.4, -2.0), 3000, 200, ["pepaso", "rodrigodigo"], "Bicycle", 200))).to.be.true;
    expect(user.historical).to.be.eql(
      [[new Date("2020-11-16T02:21:00"), 4]]
    );
    expect(user.removeRouteFromHistorical(new Date("2022-12-17T03:24:00"), 2))
      .to.be.false;
    expect(user.removeRouteFromHistorical(new Date('2021-08-12T03:24:00'), new Route(3, "El Teide", new Coord(21.3, -2.2), new Coord(20.4, -2.0), 3000, 200, ["pepaso", "rodrigodigo"], "Bicycle", 200))).to.be.false;
  });

});

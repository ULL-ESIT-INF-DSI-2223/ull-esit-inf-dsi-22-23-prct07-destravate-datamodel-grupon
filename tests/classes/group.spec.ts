import { expect } from "chai";
import "mocha";
import { Route } from "../../src/classes/route";
import { Statistics } from "../../src/classes/statistics";
import { Coord } from "../../src/classes/coord";
import { User } from "../../src/classes/user";
import { Group } from "../../src/classes/group";

describe("Group class test", () => {
  it("Group constructor ", () => {
    const usu0 = new User(
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
    const usu1 = new User(
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
    );
    const myGroup = new Group(
      1,
      "Grupo1",
      [usu0, usu1],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup).to.be.instanceof(Group);

    expect(
      () => new Group(-1, "Grupo1", [usu0, usu1], [6, 4], [[new Date(), 4]])
    ).to.throw("ID de Grupo no válido");

    expect(
      () =>
        new Group(
          1,
          "Grupo1",
          [usu0, usu1],
          [6, 4],
          [[new Date("2025-12-17T03:24:00"), 4]]
        )
    ).to.throw("La fecha de una ruta del historial no puede ser futura");

    expect(
      () =>
        new Group(
          1,
          "Grupo1",
          [usu0, usu0],
          [6, 4],
          [[new Date("2021-12-17T03:24:00"), 4]]
        )
    ).to.throw("Se han introducido dos usuarios con el mismo id");

    expect(
      () => new Group(1, "Grupo1", [usu0, usu1], [-1, 4], [[new Date(), -1]])
    ).to.throw("ID -1 de ruta no válido");

    expect(
      () => new Group(1, "Grupo1", [usu0, usu1], [6, 4], [[new Date(), -1]])
    ).to.throw("ID -1 de ruta del historial no válido");
  });
  it("id property", () => {
    const usu0 = new User(
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
    const usu1 = new User(
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
    );
    const myGroup = new Group(
      1,
      "Grupo1",
      [usu0, usu1],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup.id).to.be.eql(1);
    myGroup.id = 0;
    expect(myGroup.id).to.be.eql(0);
    expect(() => (myGroup.id = -1)).to.throw("ID de Grupo no válido");
  });
  it("name property", () => {
    const usu0 = new User(
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
    const usu1 = new User(
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
    );
    const myGroup = new Group(
      1,
      "Grupo1",
      [usu0, usu1],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup.name).to.be.eql("Grupo1");
    myGroup.name = "Grupo2";
    expect(myGroup.name).to.be.eql("Grupo2");
  });
  it("members_id property", () => {
    const usu0 = new User(
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
    const usu1 = new User(
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
    );
    const myGroup = new Group(
      1,
      "Grupo1",
      [usu0, usu1],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup.members_id).to.be.eql(["pepaso", "tomasote"]);
  });
  it("statistics property", () => {
    const usu0 = new User(
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
    const usu1 = new User(
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
    );
    const myGroup = new Group(
      1,
      "Grupo1",
      [usu0, usu1],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup.statistics).to.be.eql(
      new Statistics(10, 450, 25, 1100, 130, 9500)
    );
    expect(myGroup.removeMember("tomasote")).to.be.true;
    expect(myGroup.removeMember("tomasote")).to.be.false;
    expect(myGroup.statistics).to.be.eql(
      new Statistics(5, 200, 10, 500, 50, 4000)
    );
    expect(myGroup.addMember(usu1)).to.be.true;
    expect(myGroup.addMember(usu1)).to.be.false;
  });
  it("members_ranking property", () => {
    const usu0 = new User(
      "pepaso",
      "Pepe",
      "Running",
      ["rodrigodigo", "marcelo"],
      [2, 5],
      new Statistics(5, 200, 10, 500, 80, 4000),
      [6, 4],
      [1, 3],
      [[new Date(), 4]]
    );
    const usu1 = new User(
      "tomasote",
      "Tomás",
      "Bicycle",
      ["pepaso", "marcelo"],
      [2, 4],
      new Statistics(5, 250, 15, 600, 50, 5500),
      [6, 4, 8],
      [1, 3, 4],
      [
        [new Date(), 4],
        [new Date("2022-12-17T03:24:00"), 2],
      ]
    );
    const myGroup = new Group(
      1,
      "Grupo1",
      [usu0, usu1],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup.members_ranking).to.be.eql([usu1, usu0]);
    expect(myGroup.removeMember("tomasote")).to.be.true;
    expect(myGroup.removeMember("tomasote")).to.be.false;
    expect(myGroup.members_id).to.be.eql(["pepaso"]);
    expect(myGroup.members_ranking).to.be.eql([usu0]);
    expect(myGroup.addMember(usu1)).to.be.true;
    expect(myGroup.addMember(usu1)).to.be.false;
    expect(myGroup.members_ranking).to.be.eql([usu1, usu0]);
  });

  it("favourite_routes property", () => {
    const usu0 = new User(
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
    const usu1 = new User(
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
    );
    const myGroup = new Group(
      1,
      "Grupo1",
      [usu0, usu1],
      [6, 4],
      [[new Date(), 4]]
    );
    const myRoute = new Route(
      0,
      "Ruta1",
      new Coord(40.7128, -74.006),
      new Coord(37.7749, -122.4194),
      100,
      23,
      [],
      "Running",
      10
    );
    expect(myGroup.favourite_routes).to.be.eql([6, 4]);
    myGroup.favourite_routes = [7, 8];
    expect(myGroup.favourite_routes).to.be.eql([7, 8]);
    expect(() => (myGroup.favourite_routes = [-7, 8])).to.throw(
      "ID -7 de ruta no válido"
    );

    expect(myGroup.addFavouriteRoute(3)).to.be.true;
    expect(myGroup.addFavouriteRoute(3)).to.be.false;
    expect(myGroup.favourite_routes).to.be.eql([7, 8, 3]);
    expect(myGroup.addFavouriteRoute(myRoute)).to.be.true;
    expect(myGroup.addFavouriteRoute(myRoute)).to.be.false;
    expect(myGroup.favourite_routes).to.be.eql([7, 8, 3, 0]);
    expect(myGroup.removeFavouriteRoute(myRoute)).to.be.true;
    expect(myGroup.removeFavouriteRoute(myRoute)).to.be.false;
    expect(myGroup.favourite_routes).to.be.eql([7, 8, 3]);
    expect(myGroup.removeFavouriteRoute(3)).to.be.true;
    expect(myGroup.removeFavouriteRoute(3)).to.be.false;
    expect(myGroup.favourite_routes).to.be.eql([7, 8]);
  });

  it("historical property", () => {
    const usu0 = new User(
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
    const usu1 = new User(
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
    );
    const myGroup = new Group(
      1,
      "Grupo1",
      [usu0, usu1],
      [6, 4],
      [[new Date("2022-12-14T03:24:00"), 4]]
    );
    expect(myGroup.historical).to.be.eql([
      [new Date("2022-12-14T03:24:00"), 4],
    ]);
    myGroup.historical = [[new Date("2022-12-17T03:24:00"), 5]];
    expect(myGroup.historical).to.be.eql([
      [new Date("2022-12-17T03:24:00"), 5],
    ]);
    expect(
      () => (myGroup.historical = [[new Date("2025-12-17T03:24:00"), 2]])
    ).to.throw("La fecha de una ruta del historial no puede ser futura");
    expect(() => (myGroup.historical = [[new Date(), -1]])).to.throw(
      "ID -1 de ruta del historial no válido"
    );
    expect(() => (myGroup.historical = [[new Date(), 5.5]])).to.throw(
      "ID 5.5 de ruta del historial no válido"
    );
  });

  it("toString", () => {
    const usu0 = new User(
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
    const usu1 = new User(
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
    );
    const myGroup = new Group(
      1,
      "Grupo1",
      [usu0, usu1],
      [6, 4],
      [
        [new Date("2022-12-20T03:24:00"), 4],
        [new Date("2022-12-14T03:24:00"), 3],
      ]
    );

    const stringOut =
      "ID del grupo: 1\n" +
      "Nombre del grupo: Grupo1\n" +
      "ID de usuarios pertenecientes al grupo: pepaso,tomasote\n" +
      "ID de rutas favoritas del grupo: 6,4\n" +
      "Historico del grupo:\n" +
      "Historial:\n" +
      "  - 20/12/2022: 4\n" +
      "  - 14/12/2022: 3\n";
    expect(myGroup.toString()).to.be.eql(stringOut);
  });
});

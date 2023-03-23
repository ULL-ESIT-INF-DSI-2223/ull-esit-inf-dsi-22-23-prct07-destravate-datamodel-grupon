import { expect } from "chai";
import "mocha";
import { Route } from "../src/route";
import { Statistics } from "../src/statistics";
import { Coord } from "../src/coord";
import { User } from "../src/user";
import { Group } from "../src/group";

describe("Group class test", () => {
  it("Group constructor ", () => {
    const myGroup = new Group(
      1,
      "Grupo1",
      ["pepe", "juan"],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup).to.be.instanceof(Group);

    expect(
      () =>
        new Group(
          -1,
          "Grupo1",
          ["pepe", "juan"],
          [6, 4],
          [[new Date(), 4]]
        )
    ).to.throw("ID de Grupo no válido");

    expect(
      () =>
        new Group(
          1,
          "Grupo1",
          ["pepe", "juan"],
          [6, 4],
          [[new Date("2025-12-17T03:24:00"), 4]]
        )
    ).to.throw("La fecha de una ruta del historial no puede ser futura");

    expect(
      () =>
        new Group(
          1,
          "Grupo1",
          ["pepe", "juan"],
          [6, 4],
          [[new Date(), -1]]
        )
    ).to.throw("ID -1 de ruta del historial no válido");
  });
  it("id property", () => {
    const myGroup = new Group(
      1,
      "Grupo1",
      ["pepe", "juan"],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup.id).to.be.eql(1);
    myGroup.id = 0;
    expect(myGroup.id).to.be.eql(0);
    expect(() => (myGroup.id = -1)).to.throw("ID de Grupo no válido");
  });
  it("name property", () => {
    const myGroup = new Group(
      1,
      "Grupo1",
      ["pepe", "juan"],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup.name).to.be.eql("Grupo1");
    myGroup.name = "Grupo2";
    expect(myGroup.name).to.be.eql("Grupo2");
  });
  it("members_id property", () => {
    const myGroup = new Group(
      1,
      "Grupo1",
      ["pepe", "juan"],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup.members_id).to.be.eql(["pepe", "juan"]);
    myGroup.members_id = ["Grupo2"];
    expect(myGroup.members_id).to.be.eql(["Grupo2"]);
  });
  it("statistics property", () => {
    const myGroup = new Group(
      1,
      "Grupo1",
      ["pepe", "juan"],
      [6, 4],
      [[new Date(), 4]]
    );
    expect(myGroup.statistics).to.be.eql(
      new Statistics(5, 200, 10, 500, 50, 4000)
    );
    myGroup.statistics = new Statistics(5, 200, 10, 500, 50, 3000);
    expect(myGroup.statistics).to.be.eql(
      new Statistics(5, 200, 10, 500, 50, 3000)
    );
  });

  it("favourite_routes property", () => {
    const myGroup = new Group(
      1,
      "Grupo1",
      ["pepe", "juan"],
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
    expect(
      () => (myGroup.favourite_routes = [-7, 8])
    ).to.throw("ID -7 de ruta no válido");

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
    const myGroup = new Group(
      1,
      "Grupo1",
      ["pepe", "juan"],
      [6, 4],
      [[new Date("2022-12-14T03:24:00"), 4]]
    );
    expect(myGroup.historical).to.be.eql(
      [[new Date("2022-12-14T03:24:00"), 4]]
    );
    myGroup.historical = [
      [new Date("2022-12-17T03:24:00"), 5],
    ];
    expect(myGroup.historical).to.be.eql(
      [[new Date("2022-12-17T03:24:00"), 5]]
    );
    expect(
      () =>
        myGroup.historical = [
          [new Date("2025-12-17T03:24:00"), 2],
        ]
    ).to.throw("La fecha de una ruta del historial no puede ser futura");
    expect(
      () => myGroup.historical = [[new Date(), -1]]
    ).to.throw("ID -1 de ruta del historial no válido");
    expect(
      () => myGroup.historical = [[new Date(), 5.5]]
    ).to.throw("ID 5.5 de ruta del historial no válido");
  });
});

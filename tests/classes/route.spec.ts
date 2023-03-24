import { expect } from "chai";
import "mocha";
import { Route } from "../../src/classes/route";
import { Coord } from "../../src/classes/coord";
import { User } from "../../src/classes/user";
import { Statistics } from "../../src/classes/statistics";

describe("Route class test", () => {
  it("Constructor ", () => {
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
    expect(myRoute).to.be.instanceof(Route);
    expect(
      () =>
        new Route(
          -1,
          "Ruta1",
          new Coord(40.7128, -74.006),
          new Coord(37.7749, -122.4194),
          100,
          23,
          [],
          "Running",
          10
        )
    ).to.throw("ID de ruta no válido");

    expect(
      () =>
        new Route(
          1,
          "Ruta1",
          new Coord(40.7128, -74.006),
          new Coord(37.7749, -122.4194),
          -100,
          23,
          [],
          "Running",
          10
        )
    ).to.throw("Longitud no válida");

    expect(
      () =>
        new Route(
          1,
          "Ruta1",
          new Coord(40.7128, -74.006),
          new Coord(37.7749, -122.4194),
          100,
          -23,
          [],
          "Running",
          10
        )
    ).to.throw("Pendiente media no válida");

    expect(
      () =>
        new Route(
          1,
          "Ruta1",
          new Coord(40.7128, -74.006),
          new Coord(37.7749, -122.4194),
          100,
          23,
          [],
          "Running",
          -10
        )
    ).to.throw("Puntuación media no válida");
  });

  it("id property", () => {
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
    expect(myRoute.id).to.be.eql(0);
    myRoute.id = 1;
    expect(myRoute.id).to.be.eql(1);
    expect(() => (myRoute.id = -1)).to.throw("ID de ruta no válido");
  });
  it("name property", () => {
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
    expect(myRoute.name).to.be.eql("Ruta1");
    myRoute.name = "Ruta2";
    expect(myRoute.name).to.be.eql("Ruta2");
  });
  it("ini_cords property", () => {
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
    expect(myRoute.ini_cords).to.be.eql(new Coord(40.7128, -74.006));
    myRoute.ini_cords = new Coord(37.7749, -122.4194);
    expect(myRoute.ini_cords).to.be.eql(new Coord(37.7749, -122.4194));
  });
  it("end_cords property", () => {
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

    expect(myRoute.end_cords).to.be.eql(new Coord(37.7749, -122.4194));
    myRoute.end_cords = new Coord(40.7128, -74.006);
    expect(myRoute.end_cords).to.be.eql(new Coord(40.7128, -74.006));
  });
  it("length property", () => {
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
    expect(myRoute.length).to.be.eql(100);
    myRoute.length = 1;
    expect(myRoute.length).to.be.eql(1);
    expect(() => (myRoute.length = -1)).to.throw("Longitud no válida");
  });
  it("average_slope property", () => {
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
    expect(myRoute.average_slope).to.be.eql(23);
    myRoute.average_slope = 1;
    expect(myRoute.average_slope).to.be.eql(1);
    expect(() => (myRoute.average_slope = -1)).to.throw(
      "Pendiente media no válida"
    );
  });
  it("visitors_id property", () => {
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

    const usu1 = new User(
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

    expect(myRoute.visitors_id).to.be.eql([]);
    myRoute.visitors_id = ["Pepe"];
    expect(myRoute.visitors_id).to.be.eql(["Pepe"]);
    expect(myRoute.addVisitor(usu1)).to.be.true;
    expect(myRoute.addVisitor("Pepon")).to.be.true;

    expect(myRoute.visitors_id).to.be.eql(["Pepe", "pepaso", "Pepon"]);
    expect(myRoute.addVisitor(usu1)).to.be.false;
    expect(myRoute.addVisitor("Pepon")).to.be.false;
  });
  it("activity property", () => {
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
    expect(myRoute.activity).to.be.eql("Running");
    myRoute.activity = "Bicycle";
    expect(myRoute.activity).to.be.eql("Bicycle");
  });
  it("avg_score property", () => {
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
    expect(myRoute.avg_score).to.be.eql(10);
    myRoute.avg_score = 1;
    expect(myRoute.avg_score).to.be.eql(1);
    expect(() => (myRoute.avg_score = -1)).to.throw(
      "Puntuación media no válida"
    );
  });
  it("toString", () => {
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
    const output_string =
      "ID del ruta: 0\n" +
      "Nombre del ruta: Ruta1\n" +
      "ID que han visitado la ruta: \n" +
      "Coordenadas de inicio: (40.7128, -74.006)\n" +
      "Coordenadas de finalización: (37.7749, -122.4194)\n" +
      "Longitud de la ruta: 100\n" +
      "Desnivel medio de la ruta: 23\n" +
      "Actividad de la ruta: Running\n" +
      "Puntuación media de la ruta: 10\n";
    expect(myRoute.toString()).to.be.eql(output_string);
  });
});

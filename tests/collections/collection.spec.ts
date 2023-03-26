import "mocha";
import { expect } from "chai";
import { Collection } from "../../src/collections/collection";
import { Route } from "../../src/classes/route";
import { Coord } from "../../src/classes/coord";

describe("Collection class test", () => {
  it("Collection constructor", () => {
    expect(
      new Collection<Route, number>([
        new Route(
          0,
          "Ruta1",
          new Coord(40.7128, -74.006),
          new Coord(37.7749, -122.4194),
          100,
          23,
          [],
          "Running",
          10
        ),
        new Route(
          3,
          "El Teide",
          new Coord(21.3, -2.2),
          new Coord(20.4, -2.0),
          3000,
          200,
          ["pepaso", "rodrigodigo"],
          "Bicycle",
          200
        ),
      ])
    ).to.be.instanceof(Collection);
    expect(
      () =>
        new Collection<Route, number>([
          new Route(
            0,
            "Ruta1",
            new Coord(40.7128, -74.006),
            new Coord(37.7749, -122.4194),
            100,
            23,
            [],
            "Running",
            10
          ),
          new Route(
            3,
            "El Teide",
            new Coord(21.3, -2.2),
            new Coord(20.4, -2.0),
            3000,
            200,
            ["pepaso", "rodrigodigo"],
            "Bicycle",
            200
          ),
          new Route(
            3,
            "El Teide",
            new Coord(21.3, -2.2),
            new Coord(20.4, -2.0),
            3000,
            200,
            ["pepaso", "rodrigodigo"],
            "Bicycle",
            200
          ),
        ])
    ).to.throw("Se han introducido dos elementos con el mismo ID");
  });

  it("add function", () => {
    const collection = new Collection<Route, number>([
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      ),
    ]);

    expect(
      collection.add(
        new Route(
          3,
          "El Teide",
          new Coord(21.3, -2.2),
          new Coord(20.4, -2.0),
          3000,
          200,
          ["pepaso", "rodrigodigo"],
          "Bicycle",
          200
        )
      )
    ).to.be.true;
    expect(collection).to.be.eql(
      new Collection<Route, number>([
        new Route(
          0,
          "Ruta1",
          new Coord(40.7128, -74.006),
          new Coord(37.7749, -122.4194),
          100,
          23,
          [],
          "Running",
          10
        ),
        new Route(
          3,
          "El Teide",
          new Coord(21.3, -2.2),
          new Coord(20.4, -2.0),
          3000,
          200,
          ["pepaso", "rodrigodigo"],
          "Bicycle",
          200
        ),
      ])
    );
    expect(
      collection.add(
        new Route(
          3,
          "El Teide",
          new Coord(21.3, -2.2),
          new Coord(20.4, -2.0),
          3000,
          200,
          ["pepaso", "rodrigodigo"],
          "Bicycle",
          200
        )
      )
    ).to.be.false;
  });

  it("elements property", () => {
    const collection = new Collection<Route, number>([
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      ),
      new Route(
        3,
        "El Teide",
        new Coord(21.3, -2.2),
        new Coord(20.4, -2.0),
        3000,
        200,
        ["pepaso", "rodrigodigo"],
        "Bicycle",
        200
      ),
    ]);
    expect(collection.elements).to.be.eql([
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      ),
      new Route(
        3,
        "El Teide",
        new Coord(21.3, -2.2),
        new Coord(20.4, -2.0),
        3000,
        200,
        ["pepaso", "rodrigodigo"],
        "Bicycle",
        200
      ),
    ]);
  });

  it("update function", () => {
    const collection = new Collection<Route, number>([
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      ),
      new Route(
        3,
        "El Teide",
        new Coord(21.3, -2.2),
        new Coord(20.4, -2.0),
        3000,
        200,
        ["pepaso", "rodrigodigo"],
        "Bicycle",
        200
      ),
    ]);

    expect(
      collection.update(
        new Route(
          3,
          "Cañadas",
          new Coord(12.3, -2.2),
          new Coord(0, -2.0),
          200,
          10,
          ["pepaso"],
          "Running",
          200
        )
      )
    ).to.be.true;
    expect(collection).to.be.eql(
      new Collection<Route, number>([
        new Route(
          0,
          "Ruta1",
          new Coord(40.7128, -74.006),
          new Coord(37.7749, -122.4194),
          100,
          23,
          [],
          "Running",
          10
        ),
        new Route(
          3,
          "Cañadas",
          new Coord(12.3, -2.2),
          new Coord(0, -2.0),
          200,
          10,
          ["pepaso"],
          "Running",
          200
        ),
      ])
    );
    expect(
      collection.update(
        new Route(
          4,
          "Cañadas",
          new Coord(12.3, -2.2),
          new Coord(0, -2.0),
          200,
          10,
          ["pepaso"],
          "Running",
          200
        )
      )
    ).to.be.false;
  });

  it("remove function", () => {
    const collection = new Collection<Route, number>([
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      ),
      new Route(
        3,
        "El Teide",
        new Coord(21.3, -2.2),
        new Coord(20.4, -2.0),
        3000,
        200,
        ["pepaso", "rodrigodigo"],
        "Bicycle",
        200
      ),
    ]);

    expect(collection.remove(3)).to.be.true;
    expect(collection).to.be.eql(
      new Collection<Route, number>([
        new Route(
          0,
          "Ruta1",
          new Coord(40.7128, -74.006),
          new Coord(37.7749, -122.4194),
          100,
          23,
          [],
          "Running",
          10
        ),
      ])
    );
    expect(collection.remove(3)).to.be.false;
  });

  it("get function", () => {
    const collection = new Collection<Route, number>([
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      ),
      new Route(
        3,
        "El Teide",
        new Coord(21.3, -2.2),
        new Coord(20.4, -2.0),
        3000,
        200,
        ["pepaso", "rodrigodigo"],
        "Bicycle",
        200
      ),
    ]);

    expect(collection.get(0)).to.be.eql(
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      )
    );
    expect(collection.get(-1)).to.be.undefined;
    expect(collection.get(3)).to.be.undefined;
  });

  it("hasID function", () => {
    const collection = new Collection<Route, number>([
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      ),
      new Route(
        3,
        "El Teide",
        new Coord(21.3, -2.2),
        new Coord(20.4, -2.0),
        3000,
        200,
        ["pepaso", "rodrigodigo"],
        "Bicycle",
        200
      ),
    ]);

    expect(collection.hasID(-1)).to.be.false;
    expect(collection.hasID(3)).to.be.true;
  });

  it("getByID function", () => {
    const collection = new Collection<Route, number>([
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      ),
      new Route(
        3,
        "El Teide",
        new Coord(21.3, -2.2),
        new Coord(20.4, -2.0),
        3000,
        200,
        ["pepaso", "rodrigodigo"],
        "Bicycle",
        200
      ),
    ]);

    expect(collection.getByID(0)).to.be.eql(
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      )
    );
    expect(collection.getByID(3)).to.be.eql(
      new Route(
        3,
        "El Teide",
        new Coord(21.3, -2.2),
        new Coord(20.4, -2.0),
        3000,
        200,
        ["pepaso", "rodrigodigo"],
        "Bicycle",
        200
      )
    );
    expect(collection.getByID(5)).to.be.undefined;
  });

  it("toString function", () => {
    const collection = new Collection<Route, number>([
      new Route(
        0,
        "Ruta1",
        new Coord(40.7128, -74.006),
        new Coord(37.7749, -122.4194),
        100,
        23,
        [],
        "Running",
        10
      ),
      new Route(
        3,
        "El Teide",
        new Coord(21.3, -2.2),
        new Coord(20.4, -2.0),
        3000,
        200,
        ["pepaso", "rodrigodigo"],
        "Bicycle",
        200
      ),
    ]);
    const output_string =
      "--------------------\n" +
      "ID del ruta: 0\n" +
      "Nombre del ruta: Ruta1\n" +
      "ID que han visitado la ruta: \n" +
      "Coordenadas de inicio: (40.7128, -74.006)\n" +
      "Coordenadas de finalización: (37.7749, -122.4194)\n" +
      "Longitud de la ruta: 100\n" +
      "Desnivel medio de la ruta: 23\n" +
      "Actividad de la ruta: Running\n" +
      "Puntuación media de la ruta: 10\n\n" +
      "--------------------\n" +
      "ID del ruta: 3\n" +
      "Nombre del ruta: El Teide\n" +
      "ID que han visitado la ruta: pepaso,rodrigodigo\n" +
      "Coordenadas de inicio: (21.3, -2.2)\n" +
      "Coordenadas de finalización: (20.4, -2)\n" +
      "Longitud de la ruta: 3000\n" +
      "Desnivel medio de la ruta: 200\n" +
      "Actividad de la ruta: Bicycle\n" +
      "Puntuación media de la ruta: 200\n\n" +
      "--------------------\n";
    expect(collection.toString()).to.be.equal(output_string);
  });
});

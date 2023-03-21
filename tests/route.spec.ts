import { expect } from "chai";
import "mocha";
import { Route } from "../src/Route";

describe("Test de la clase Route", () => {
  it("Constructor ", () => {
    const cords_ini = {
      latitude_: 40.7128,
      longitude_: -74.006,
    };
    const end_cords = {
      latitude_: 37.7749,
      longitude_: -122.4194,
    };
    const myRoute = new Route(
      0,
      "Ruta1",
      cords_ini,
      end_cords,
      100,
      23,
      [],
      "Running",
      10
    );
    expect(myRoute).to.not.be.undefined;
  });

  it("Correcto funcionamiento de getters", () => {
    const cords_ini = {
      latitude_: 40.7128,
      longitude_: -74.006,
    };
    const end_cords = {
      latitude_: 37.7749,
      longitude_: -122.4194,
    };
    const myRoute = new Route(
      0,
      "Ruta1",
      cords_ini,
      end_cords,
      100,
      23,
      [],
      "Running",
      10
    );

    expect(myRoute.id).to.be.eql(0);
    expect(myRoute.name).to.be.eql("Ruta1");
    expect(myRoute.ini_cords).to.be.eql(cords_ini);
    expect(myRoute.end_cords).to.be.eql(end_cords);
    expect(myRoute.length).to.be.eql(100);
    expect(myRoute.average_slope).to.be.eql(23);
    expect(myRoute.visitors_id).to.be.eql([]);
    expect(myRoute.activity).to.be.eql("Running");
    expect(myRoute.avg_score).to.be.eql(10);
  });
});

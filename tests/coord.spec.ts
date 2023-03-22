import "mocha";
import { expect } from "chai";
import { Coord } from "../src/coord";

describe("Coord class test", () => {
  it("Cooord constructor ", () => {
    const coord1 = new Coord(40.7128, -74.006);
    const coord2 = new Coord(23.111, -55.006);

    expect(coord1.latitude).to.be.eql(40.7128);
    expect(coord1.longitude).to.be.eql(-74.006);

    expect(coord2.latitude).to.be.eql(23.111);
    expect(coord2.longitude).to.be.eql(-55.006);

    expect(() => new Coord(91, 140)).to.throw("Latitud fuera de rango");
    expect(() => new Coord(-91, -74.006)).to.throw("Latitud fuera de rango");

    expect(() => new Coord(50, 181)).to.throw("Longitud fuera de rango");
    expect(() => new Coord(50, -181)).to.throw("Longitud fuera de rango");
  });

  it("latitude property", () => {
    const coord1 = new Coord(40.7128, -74.006);
    const coord2 = new Coord(23.111, -55.006);
    expect(coord1.latitude).to.be.eql(40.7128);
    expect(coord2.latitude).to.be.eql(23.111);
  });

  it("longitude property", () => {
    const coord1 = new Coord(40.7128, -74.006);
    const coord2 = new Coord(23.111, -55.006);
    expect(coord1.longitude).to.be.eql(-74.006);
    expect(coord2.longitude).to.be.eql(-55.006);
  });

  it("latitude setter", () => {
    const coord1 = new Coord(40.7128, -74.006);
    expect(coord1.latitude).to.be.eql(40.7128);
    coord1.latitude = 80;
    expect(coord1.latitude).to.be.eql(80);
    expect(() => (coord1.latitude = 181)).to.throw("Latitud fuera de rango");
    expect(() => (coord1.latitude = -181)).to.throw("Latitud fuera de rango");
  });

  it("longitude setter", () => {
    const coord1 = new Coord(40.7128, -74.006);
    expect(coord1.longitude).to.be.eql(-74.006);
    coord1.longitude = 36;
    expect(coord1.longitude).to.be.eql(36);
    expect(() => (coord1.longitude = 181)).to.throw("Longitud fuera de rango");
    expect(() => (coord1.longitude = -181)).to.throw("Longitud fuera de rango");
  });

  it("Coord toString", () => {
    const coord1 = new Coord(40.7128, -74.006);
    const coord2 = new Coord(23.111, -55.006);

    expect(coord1.toString()).to.be.eql("(40.7128, -74.006)");
    expect(coord2.toString()).to.be.eql("(23.111, -55.006)");
  });
});

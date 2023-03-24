import "mocha";
import { expect } from "chai";
import { RouteCollection } from "../../src/collections/routeCollection";
import { routeExample1 } from "../../src/examples/routeExample";
import { Route } from "../../src/classes/route";

describe("RouteCollection class test", () => {
  it("RouteCollection constructor ", () => {
    const collection = new RouteCollection(routeExample1);
    expect(collection).to.be.instanceOf(RouteCollection);
  });
  it("sortAlphabetically", () => {
    const collection = new RouteCollection(routeExample1);
    collection.sortAlphabetically();
    expect((collection.get(0) as Route).name).to.be.eql("Ruta1");
    expect((collection.get(9) as Route).name).to.be.eql("Ruta90");
    collection.sortReversedAlphabetically();
    expect((collection.get(9) as Route).name).to.be.eql("Ruta1");
    expect((collection.get(0) as Route).name).to.be.eql("Ruta90");
  });
  it("sortByNumberUsers", () => {
    const collection = new RouteCollection(routeExample1);
    collection.sortByNumberUsers();
    expect((collection.get(0) as Route).name).to.be.eql("Ruta1");
    expect((collection.get(9) as Route).name).to.be.eql("Ruta90");
    collection.sortReversedByNumberUsers();
    expect((collection.get(9) as Route).name).to.be.eql("Ruta1");
    expect((collection.get(0) as Route).name).to.be.eql("Ruta90");
  });
  it("sortByLenght", () => {
    const collection = new RouteCollection(routeExample1);
    collection.sortByLenght();
    expect((collection.get(0) as Route).name).to.be.eql("Ruta1");
    expect((collection.get(9) as Route).name).to.be.eql("Ruta21");
    collection.sortReversedByLenght();
    expect((collection.get(9) as Route).name).to.be.eql("Ruta1");
    expect((collection.get(0) as Route).name).to.be.eql("Ruta21");
  });
  it("sortByScore", () => {
    const collection = new RouteCollection(routeExample1);
    collection.sortByScore();
    expect((collection.get(0) as Route).name).to.be.eql("Ruta2");
    expect((collection.get(9) as Route).name).to.be.eql("Ruta5");
    collection.sortReversedByScore();
    expect((collection.get(9) as Route).name).to.be.eql("Ruta2");
    expect((collection.get(0) as Route).name).to.be.eql("Ruta5");
  });
  it("sortByActivity", () => {
    const collection = new RouteCollection(routeExample1);
    collection.sortByActivity();
    expect((collection.get(0) as Route).name).to.be.eql("Ruta90");
    expect((collection.get(3) as Route).name).to.be.eql("Ruta2");
  });
});

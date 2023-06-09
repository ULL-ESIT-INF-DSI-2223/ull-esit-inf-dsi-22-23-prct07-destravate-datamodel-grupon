import "mocha";
import { expect } from "chai";
import { Statistics } from "../../src/classes/statistics";

describe("Statistics class tests", () => {
  it("Statistics constructor", () => {
    expect(new Statistics(5, 200, 10, 500, 50, 4000)).to.be.instanceof(
      Statistics
    );
    expect(() => new Statistics(-5, 200, 10, 500, 50, 4000)).to.throw(
      "La cantidad de kilómetros de la semana no puede ser negativa"
    );
    expect(() => new Statistics(5, -200, 10, 500, 50, 4000)).to.throw(
      "El desnivel total acumulado de la semana no puede ser negativo"
    );
    expect(() => new Statistics(5, 200, -10, 500, 50, 4000)).to.throw(
      "La cantidad de kilómetros del mes no puede ser negativa"
    );
    expect(() => new Statistics(5, 200, 10, -500, 50, 4000)).to.throw(
      "El desnivel total acumulado del mes no puede ser negativo"
    );
    expect(() => new Statistics(5, 200, 10, 500, -50, 4000)).to.throw(
      "La cantidad de kilómetros del año no puede ser negativa"
    );
    expect(() => new Statistics(5, 200, 10, 500, 50, -4000)).to.throw(
      "El desnivel total acumulado del año no puede ser negativo"
    );
    expect(() => new Statistics(20, 200, 10, 500, 50, 4000)).to.throw(
      "La cantidad de kilómetros de la semana no puede ser mayor a la cantidad de kilómetros del mes"
    );
    expect(() => new Statistics(5, 200, 60, 500, 50, 4000)).to.throw(
      "La cantidad de kilómetros del mes no puede ser mayor a la cantidad de kilómetros del año"
    );
    expect(() => new Statistics(5, 600, 10, 500, 50, 4000)).to.throw(
      "El desnivel total acumulado de la semana no puede ser mayor al desnivel total acumulado del mes"
    );
    expect(() => new Statistics(5, 200, 10, 5000, 50, 4000)).to.throw(
      "El desnivel total acumulado del mes no puede ser mayor al desnivel total acumulado del año"
    );
  });

  it("week_kilometers property", () => {
    const user_statistics: Statistics = new Statistics(
      5,
      200,
      10,
      500,
      50,
      4000
    );
    expect(user_statistics.week_kilometers).to.be.equal(5);
    user_statistics.week_kilometers = 6.5;
    expect(user_statistics.week_kilometers).to.be.equal(6.5);
    expect(() => (user_statistics.week_kilometers = -2)).to.throw(
      "La cantidad de kilómetros de la semana no puede ser negativa"
    );
    expect(() => (user_statistics.week_kilometers = 20)).to.throw(
      "La cantidad de kilómetros de la semana no puede ser mayor a la cantidad de kilómetros del mes"
    );
  });

  it("week_unevenness property", () => {
    const user_statistics: Statistics = new Statistics(
      5,
      200,
      10,
      500,
      50,
      4000
    );
    expect(user_statistics.week_unevenness).to.be.equal(200);
    user_statistics.week_unevenness = 250.5;
    expect(user_statistics.week_unevenness).to.be.equal(250.5);
    expect(() => (user_statistics.week_unevenness = -2)).to.throw(
      "El desnivel total acumulado de la semana no puede ser negativo"
    );
    expect(() => (user_statistics.week_unevenness = 600)).to.throw(
      "El desnivel total acumulado del mes no puede ser mayor al desnivel total acumulado del año"
    );
  });

  it("month_kilometers property", () => {
    const user_statistics: Statistics = new Statistics(
      5,
      200,
      10,
      500,
      50,
      4000
    );
    expect(user_statistics.month_kilometers).to.be.equal(10);
    user_statistics.month_kilometers = 15.5;
    expect(user_statistics.month_kilometers).to.be.equal(15.5);
    expect(() => (user_statistics.month_kilometers = -2)).to.throw(
      "La cantidad de kilómetros del mes no puede ser negativa"
    );
    expect(() => (user_statistics.month_kilometers = 5000)).to.throw(
      "La cantidad de kilómetros del mes no puede ser mayor a la cantidad de kilómetros del año"
    );
    expect(() => (user_statistics.month_kilometers = 2)).to.throw(
      "La cantidad de kilómetros del mes no puede ser menor a la cantidad de kilómetros de la semana"
    );
  });

  it("month_unevenness property", () => {
    const user_statistics: Statistics = new Statistics(
      5,
      200,
      10,
      500,
      50,
      4000
    );
    expect(user_statistics.month_unevenness).to.be.equal(500);
    user_statistics.month_unevenness = 600.5;
    expect(user_statistics.month_unevenness).to.be.equal(600.5);
    expect(() => (user_statistics.month_unevenness = -2)).to.throw(
      "El desnivel total acumulado del mes no puede ser negativo"
    );
    expect(() => (user_statistics.month_unevenness = 5000)).to.throw(
      "El desnivel total acumulado del mes no puede ser mayor al desnivel total acumulado del año"
    );
    expect(() => (user_statistics.month_unevenness = 100)).to.throw(
      "El desnivel total acumulado del mes no puede ser menor al desnivel total acumulado de la semana"
    );
  });

  it("year_kilometers property", () => {
    const user_statistics: Statistics = new Statistics(
      5,
      200,
      10,
      500,
      50,
      4000
    );
    expect(user_statistics.year_kilometers).to.be.equal(50);
    user_statistics.year_kilometers = 60.5;
    expect(user_statistics.year_kilometers).to.be.equal(60.5);
    expect(() => (user_statistics.year_kilometers = -2)).to.throw(
      "La cantidad de kilómetros del año no puede ser negativa"
    );
    expect(() => (user_statistics.year_kilometers = 9)).to.throw(
      "La cantidad de kilómetros del año no puede ser menor a la cantidad de kilómetros del mes"
    );
  });

  it("year_unevenness property", () => {
    const user_statistics: Statistics = new Statistics(
      5,
      200,
      10,
      500,
      50,
      4000
    );
    expect(user_statistics.year_unevenness).to.be.equal(4000);
    user_statistics.year_unevenness = 5000.5;
    expect(user_statistics.year_unevenness).to.be.equal(5000.5);
    expect(() => (user_statistics.year_unevenness = -2)).to.throw(
      "El desnivel total acumulado del año no puede ser negativo"
    );
    expect(() => (user_statistics.year_unevenness = 499)).to.throw(
      "El desnivel total acumulado del año no puede ser menor al desnivel total acumulado del mes"
    );
  });

  it("toString function", () => {
    const user_statistics: Statistics = new Statistics(
      5,
      200,
      10,
      500,
      50,
      4000
    );
    const output_string =
      "  - Kilómetros de la semana: 5\n" +
      "  - Desnivel de la semana: 200\n" +
      "  - Kilómetros de la mes: 10\n" +
      "  - Desnivel de la mes: 500\n" +
      "  - Kilómetros de la año: 50\n" +
      "  - Desnivel de la año: 4000\n";

    expect(user_statistics.toString()).to.be.equal(output_string);
  });
});

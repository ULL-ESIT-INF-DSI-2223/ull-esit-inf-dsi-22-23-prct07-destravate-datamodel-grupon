import "mocha";
import { expect } from "chai";
import { Challenge } from "../src/challenge";
import { Activities } from "../src/activities";
import { Route } from "../src/route";
import { User } from "../src/user";
import { UserStatistics } from "../src/user_statistics";

describe("Challenge class tests", () => {
    it("Challenge constructor", () => {
        expect(new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]))).to.be.instanceof(Challenge);
        expect(() => new Challenge(-1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]))).to.throw(
            "ID del reto no válido"
        );
        expect(() => new Challenge(1.5, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]))).to.throw(
            "ID del reto no válido"
        );
        expect(() => new Challenge(-1, "Reto Extremo", new Set<number>([-2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]))).to.throw(
            "ID -2 de la ruta 0 no válido"
        );
        expect(() => new Challenge(-1, "Reto Extremo", new Set<number>([2, 4.5, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]))).to.throw(
            "ID 4.5 de la ruta 1 no válido"
        );
        expect(() => new Challenge(-1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, -10, new Set<string>(["pepaso", "rodrigodigo"]))).to.throw(
            "El total de kilómetros debe ser positivo"
        );
    });

    it("id property", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.id).to.be.equal(1);
        challenge.id = 3;
        expect(challenge.id).to.be.equal(3);
        expect(() => challenge.id = -1).to.throw(
            "ID del reto no válido"
        );
        expect(() => challenge.id = 1.5).to.throw(
            "ID del reto no válido"
        );
    });

    it("name property", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.name).to.be.equal("Reto Extremo");
        challenge.name = "Transvulcania";
        expect(challenge.name).to.be.equal("Transvulcania");
    });

    it("routes property", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.routes).to.be.eql(new Set<number>([2, 4, 5]));
        challenge.routes = new Set<number>([7, 8]);
        expect(challenge.routes).to.be.eql(new Set<number>([7, 8]));
        expect(() => challenge.routes = new Set<number>([-1, 4, 5])).to.throw(
            "ID -1 de la ruta 0 no válido"
        );
        expect(() => challenge.routes = new Set<number>([2, 4.5, 5])).to.throw(
            "ID 4.5 de la ruta 1 no válido"
        );
    });

    it("addRoute function", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.addRoute(7)).to.be.true;
        expect(challenge.routes).to.be.eql(new Set<number>([2, 4, 5, 7]));
        //expect(challenge.addRoute(new Route(8, ))).to.be.true;
        expect(challenge.routes).to.be.eql(new Set<number>([2, 4, 5, 7, 8]));
        expect(challenge.addRoute(-1)).to.be.false;
        expect(challenge.addRoute(6.5)).to.be.false;
        expect(challenge.addRoute(5)).to.be.false;
        //expect(challenge.addRoute(new Route(-1, ))).to.be.false;
        //expect(challenge.addRoute(new Route(8.5, ))).to.be.false;
        //expect(challenge.addRoute(new Route(7, ))).to.be.false;
    });

    it("removeRoute function", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5, 7, 8]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.removeRoute(7)).to.be.true;
        expect(challenge.routes).to.be.eql(new Set<number>([2, 4, 5, 8]));
        //expect(challenge.removeRoute(new Route(8, ))).to.be.true;
        expect(challenge.routes).to.be.eql(new Set<number>([2, 4, 5]));
        expect(challenge.removeRoute(8)).to.be.false;
        //expect(challenge.removeRoute(new Route(7, ))).to.be.false;
    });

    it("activity property", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.activity).to.be.equal(Activities.CORRER);
        challenge.activity = Activities.BICICLETA;
        expect(challenge.activity).to.be.equal(Activities.BICICLETA);
    });

    it("total_kilometers property", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.total_kilometers).to.be.equal(60);
        challenge.total_kilometers = 75.5;
        expect(challenge.total_kilometers).to.be.equal(75.5);
        expect(() => challenge.total_kilometers = -10).to.throw(
            "El total de kilómetros debe ser positivo"
        );
    });

    it("users property", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.users).to.be.eql(new Set<string>(["pepaso", "rodrigodigo"]));
        challenge.users = new Set<string>(["alfredillo", "tomasote"]);
        expect(challenge.users).to.be.eql(new Set<string>(["alfredillo", "tomasote"]));
    });

    it("addUser function", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.addUser("alfredillo")).to.be.true;
        expect(challenge.users).to.be.eql(new Set<string>(["pepaso", "rodrigodigo", "alfredillo"]));
        expect(challenge.addUser(new User("tomasote", "Tomás", Activities.BICICLETA, new Set<string>(["pepaso", "marcelo"]), new Set<number>([2, 4]), new UserStatistics(5, 250, 15, 600, 80, 5500), new Set<number>([6, 4, 8]), new Set<number>([1, 3, 4]), new Set<[Date, number]>([[new Date(), 4,], [new Date("2022-12-17T03:24:00"), 2]])))).to.be.true;
        expect(challenge.users).to.be.eql(new Set<string>(["pepaso", "rodrigodigo", "alfredillo", "tomasote"]));
        expect(challenge.addUser("pepaso")).to.be.false;
        expect(challenge.addUser(new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]])))).to.be.false;
    });

    it("removeUser function", () => {
        const challenge: Challenge = new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo", "alfredillo", "tomasote"]));
        expect(challenge.removeUser("alfredillo")).to.be.true;
        expect(challenge.users).to.be.eql(new Set<string>(["pepaso", "rodrigodigo", "tomasote"]));
        expect(challenge.removeUser(new User("tomasote", "Tomás", Activities.BICICLETA, new Set<string>(["pepaso", "marcelo"]), new Set<number>([2, 4]), new UserStatistics(5, 250, 15, 600, 80, 5500), new Set<number>([6, 4, 8]), new Set<number>([1, 3, 4]), new Set<[Date, number]>([[new Date(), 4,], [new Date("2022-12-17T03:24:00"), 2]])))).to.be.true;
        expect(challenge.users).to.be.eql(new Set<string>(["pepaso", "rodrigodigo"]));
        expect(challenge.removeUser("alfredillo")).to.be.false;
        expect(challenge.removeUser(new User("tomasote", "Tomás", Activities.BICICLETA, new Set<string>(["pepaso", "marcelo"]), new Set<number>([2, 4]), new UserStatistics(5, 250, 15, 600, 80, 5500), new Set<number>([6, 4, 8]), new Set<number>([1, 3, 4]), new Set<[Date, number]>([[new Date(), 4,], [new Date("2022-12-17T03:24:00"), 2]])))).to.be.false;
    });
});
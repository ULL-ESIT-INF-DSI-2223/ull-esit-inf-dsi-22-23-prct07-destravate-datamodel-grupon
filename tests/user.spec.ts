import "mocha";
import { expect } from "chai";
import { User } from "../src/user";
import { Activities } from "../src/activities";
import { UserStatistics } from "../src/user_statistics";
import { Group } from "../src/group";
import { Route } from "../src/route";
import { Challenge } from "../src/challenge";

describe("User class tests", () => {
    it("User constructor", () => {
        expect(new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]))).to.be.instanceof(User);
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["pepaso", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]))).to.throw(
            "Un usuario no puede ser amigo de sí mismo"
        );
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([-1, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]))).to.throw(
            "ID -1 del grupo 0 no válido"
        );
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5.5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]))).to.throw(
            "ID 5.5 del grupo 1 no válido"
        );
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([-6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]))).to.throw(
            "ID -6 de la ruta 0 no válido"
        );
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4.5]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]))).to.throw(
            "ID 4.5 de la ruta 1 no válido"
        );
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([-1, 3]), new Set<[Date, number]>([[new Date(), 4]]))).to.throw(
            "ID -1 del reto 0 no válido"
        );
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3.5]), new Set<[Date, number]>([[new Date(), 4]]))).to.throw(
            "ID 3.5 del reto 1 no válido"
        );
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date('2025-12-17T03:24:00'), 4]]))).to.throw(
            "La fecha de una ruta del historial no puede ser futura"
        );
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), -1]]))).to.throw(
            "ID -1 de la ruta 0 del historial no válido"
        );
        expect(() => new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4.5]]))).to.throw(
            "ID 4.5 de la ruta 0 del historial no válido"
        );
    });

    it("id property", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.id).to.be.equal("pepaso");
        user.id = "pepase";
        expect(user.id).to.be.equal("pepase");
    });

    it("name property", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.name).to.be.equal("Pepe");
        user.name = "José";
        expect(user.name).to.be.equal("José");
    });

    it("activity property", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.activity).to.be.equal(Activities.CORRER);
        user.activity = Activities.BICICLETA;
        expect(user.activity).to.be.equal(Activities.BICICLETA);
    });

    it("friends property", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.friends).to.be.eql(new Set<string>(["rodrigodigo", "marcelo"]));
        user.friends = new Set<string>(["alfredillo", "tomasote"]);
        expect(user.friends).to.be.eql(new Set<string>(["alfredillo", "tomasote"]));
        expect(() => user.friends = new Set<string>(["pepaso", "tomasote"])).to.throw(
            "Un usuario no puede ser amigo de sí mismo"
        );
    });

    it("addFriend function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.addFriend("alfredillo")).to.be.true;
        expect(user.friends).to.be.eql(new Set<string>(["rodrigodigo", "marcelo", "alfredillo"]));
        expect(user.addFriend(new User("tomasote", "Tomás", Activities.BICICLETA, new Set<string>(["pepaso", "marcelo"]), new Set<number>([2, 4]), new UserStatistics(5, 250, 15, 600, 80, 5500), new Set<number>([6, 4, 8]), new Set<number>([1, 3, 4]), new Set<[Date, number]>([[new Date(), 4,], [new Date("2022-12-17T03:24:00"), 2]])))).to.be.true;
        expect(user.friends).to.be.eql(new Set<string>(["rodrigodigo", "marcelo", "alfredillo", "tomasote"]));
        expect(user.addFriend("pepaso")).to.be.false;
        expect(user.addFriend("rodrigodigo")).to.be.false;
        expect(user.addFriend(new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]])))).to.be.false;
        expect(user.addFriend(new User("tomasote", "Tomás", Activities.BICICLETA, new Set<string>(["pepaso", "marcelo"]), new Set<number>([2, 4]), new UserStatistics(5, 250, 15, 600, 80, 5500), new Set<number>([6, 4, 8]), new Set<number>([1, 3, 4]), new Set<[Date, number]>([[new Date(), 4,], [new Date("2022-12-17T03:24:00"), 2]])))).to.be.false;
    });

    it("removeFriend function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo", "alfredillo", "tomasote"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.removeFriend("alfredillo")).to.be.true;
        expect(user.friends).to.be.eql(new Set<string>(["rodrigodigo", "marcelo", "tomasote"]));
        expect(user.removeFriend(new User("tomasote", "Tomás", Activities.BICICLETA, new Set<string>(["pepaso", "marcelo"]), new Set<number>([2, 4]), new UserStatistics(5, 250, 15, 600, 80, 5500), new Set<number>([6, 4, 8]), new Set<number>([1, 3, 4]), new Set<[Date, number]>([[new Date(), 4,], [new Date("2022-12-17T03:24:00"), 2]])))).to.be.true;
        expect(user.friends).to.be.eql(new Set<string>(["rodrigodigo", "marcelo"]));
        expect(user.removeFriend("alfredillo")).to.be.false;
        expect(user.removeFriend(new User("tomasote", "Tomás", Activities.BICICLETA, new Set<string>(["pepaso", "marcelo"]), new Set<number>([2, 4]), new UserStatistics(5, 250, 15, 600, 80, 5500), new Set<number>([6, 4, 8]), new Set<number>([1, 3, 4]), new Set<[Date, number]>([[new Date(), 4,], [new Date("2022-12-17T03:24:00"), 2]])))).to.be.false;
    });

    it("groups property", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.groups).to.be.eql(new Set<number>([2, 5]));
        user.groups = new Set<number>([7, 8]);
        expect(user.groups).to.be.eql(new Set<number>([7, 8]));
        expect(() => user.groups = new Set<number>([-1, 5])).to.throw(
            "ID -1 del grupo 0 no válido"
        );
        expect(() => user.groups = new Set<number>([2, 5.5])).to.throw(
            "ID 5.5 del grupo 1 no válido"
        );
    });

    it("addGroup function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.addGroup(7)).to.be.true;
        expect(user.groups).to.be.eql(new Set<number>([2, 5, 7]));
        //expect(user.addGroup(new Group(8, ))).to.be.true;
        expect(user.groups).to.be.eql(new Set<number>([2, 5, 7, 8]));
        expect(user.addGroup(-1)).to.be.false;
        expect(user.addGroup(5.5)).to.be.false;
        expect(user.addGroup(5)).to.be.false;
        //expect(user.addGroup(new Group(-1, ))).to.be.false;
        //expect(user.addGroup(new Group(8.5, ))).to.be.false;
        //expect(user.addGroup(new Group(7, ))).to.be.false;
    });

    it("removeGroup function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5, 7, 8]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.removeGroup(7)).to.be.true;
        expect(user.groups).to.be.eql(new Set<number>([2, 5, 8]));
        //expect(user.removeGroup(new Group(8, ))).to.be.true;
        expect(user.groups).to.be.eql(new Set<number>([2, 5]));
        expect(user.removeGroup(8)).to.be.false;
        //expect(user.removeGroup(new Group(7, ))).to.be.false;
    });

    it("statistics property", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.statistics).to.be.eql(new UserStatistics(5, 200, 10, 500, 50, 4000));
        user.statistics = new UserStatistics(8, 250, 12, 400, 60, 3000);
        expect(user.statistics).to.be.eql(new UserStatistics(8, 250, 12, 400, 60, 3000));
    });

    it("favourite_routes property", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.favourite_routes).to.be.eql(new Set<number>([6, 4]));
        user.favourite_routes = new Set<number>([7, 8]);
        expect(user.favourite_routes).to.be.eql(new Set<number>([7, 8]));
        expect(() => user.favourite_routes = new Set<number>([-1, 4])).to.throw(
            "ID -1 de la ruta 0 no válido"
        );
        expect(() => user.favourite_routes = new Set<number>([6, 4.5])).to.throw(
            "ID 4.5 de la ruta 1 no válido"
        );
    });

    it("addFavouriteRoute function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.addFavouriteRoute(7)).to.be.true;
        expect(user.favourite_routes).to.be.eql(new Set<number>([6, 4, 7]));
        //expect(user.addFavouriteRoute(new Route(8, ))).to.be.true;
        expect(user.favourite_routes).to.be.eql(new Set<number>([6, 4, 7, 8]));
        expect(user.addFavouriteRoute(-1)).to.be.false;
        expect(user.addFavouriteRoute(6.5)).to.be.false;
        expect(user.addFavouriteRoute(6)).to.be.false;
        //expect(user.addFavouriteRoute(new Route(-1, ))).to.be.false;
        //expect(user.addFavouriteRoute(new Route(8.5, ))).to.be.false;
        //expect(user.addFavouriteRoute(new Route(7, ))).to.be.false;
    });

    it("removeFavouriteRoute function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4, 7, 8]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.removeFavouriteRoute(7)).to.be.true;
        expect(user.favourite_routes).to.be.eql(new Set<number>([6, 4, 8]));
        //expect(user.removeFavouriteRoute(new Route(8, ))).to.be.true;
        expect(user.favourite_routes).to.be.eql(new Set<number>([6, 4]));
        expect(user.removeFavouriteRoute(8)).to.be.false;
        //expect(user.removeFavouriteRoute(new Route(7, ))).to.be.false;
    });

    it("active_challenges property", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.active_challenges).to.be.eql(new Set<number>([1, 3]));
        user.active_challenges = new Set<number>([2, 4]);
        expect(user.active_challenges).to.be.eql(new Set<number>([2, 4]));
        expect(() => user.active_challenges = new Set<number>([-1, 3])).to.throw(
            "ID -1 del reto 0 no válido"
        );
        expect(() => user.active_challenges = new Set<number>([1, 3.5])).to.throw(
            "ID 3.5 del reto 1 no válido"
        );
    });

    it("addActiveChallenge function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.addActiveChallenge(7)).to.be.true;
        expect(user.active_challenges).to.be.eql(new Set<number>([1, 3, 7]));
        expect(user.addActiveChallenge(new Challenge(8, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"])))).to.be.true;
        expect(user.active_challenges).to.be.eql(new Set<number>([1, 3, 7, 8]));
        expect(user.addActiveChallenge(-1)).to.be.false;
        expect(user.addActiveChallenge(1.5)).to.be.false;
        expect(user.addActiveChallenge(1)).to.be.false;
        expect(user.addActiveChallenge(new Challenge(-1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"])))).to.be.false;
        expect(user.addActiveChallenge(new Challenge(2.5, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"])))).to.be.false;
        expect(user.addActiveChallenge(new Challenge(1, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"])))).to.be.false;
    });

    it("removeActiveChallenge function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3, 7, 8]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.removeActiveChallenge(7)).to.be.true;
        expect(user.active_challenges).to.be.eql(new Set<number>([1, 3, 8]));
        expect(user.removeActiveChallenge(new Challenge(8, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"])))).to.be.true;
        expect(user.active_challenges).to.be.eql(new Set<number>([1, 3]));
        expect(user.removeActiveChallenge(8)).to.be.false;
        expect(user.removeActiveChallenge(new Challenge(7, "Reto Extremo", new Set<number>([2, 4, 5]), Activities.CORRER, 60, new Set<string>(["pepaso", "rodrigodigo"])))).to.be.false;
    });

    it("historical property", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.historical).to.be.eql(new Set<[Date, number]>([[new Date(), 4]]));
        user.historical = new Set<[Date, number]>([[new Date("2022-12-17T03:24:00"), 5]]);
        expect(user.historical).to.be.eql(new Set<[Date, number]>([[new Date("2022-12-17T03:24:00"), 5]]));
        expect(() => user.historical = new Set<[Date, number]>([[new Date('2025-12-17T03:24:00'), 2]])).to.throw(
            "La fecha de una ruta del historial no puede ser futura"
        );
        expect(() => user.historical = new Set<[Date, number]>([[new Date(), -1]])).to.throw(
            "ID -1 de la ruta 0 del historial no válido"
        );
        expect(() => user.historical = new Set<[Date, number]>([[new Date(), 5.5]])).to.throw(
            "ID 5.5 de la ruta 0 del historial no válido"
        );
    });

    it("addRouteToHistorical function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3]), new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.addRouteToHistorical(new Date('2022-12-17T03:24:00'), 2)).to.be.true;
        expect(user.historical).to.be.eql(new Set<[Date, number]>([[new Date(), 4], [new Date('2022-12-17T03:24:00'), 2]]));
        //expect(user.addRouteToHistorical(new Date('2021-08-12T03:24:00'), new Route(3, ))).to.be.true;
        expect(user.historical).to.be.eql(new Set<[Date, number]>([[new Date(), 4], [new Date('2022-12-17T03:24:00'), 2], [new Date('2021-08-12T03:24:00'), 3]]));
        expect(user.addRouteToHistorical(new Date('2025-12-17T03:24:00'), 2)).to.be.false;
        expect(user.addRouteToHistorical(new Date('2022-12-17T03:24:00'), -1)).to.be.false;
        expect(user.addRouteToHistorical(new Date('2022-12-17T03:24:00'), 2.5)).to.be.false;
        //expect(user.addRouteToHistorical(new Date('2025-08-12T03:24:00'), new Route(3, ))).to.be.false;
        //expect(user.addRouteToHistorical(new Date('2021-08-12T03:24:00'), new Route(-1, ))).to.be.false;
        //expect(user.addRouteToHistorical(new Date('2021-08-12T03:24:00'), new Route(3.5, ))).to.be.false;
    });

    it("removeRouteFromHistorical function", () => {
        const user: User = new User("pepaso", "Pepe", Activities.CORRER, new Set<string>(["rodrigodigo", "marcelo"]), new Set<number>([2, 5]), new UserStatistics(5, 200, 10, 500, 50, 4000), new Set<number>([6, 4]), new Set<number>([1, 3, 7, 8]), new Set<[Date, number]>([[new Date(), 4], [new Date('2022-12-17T03:24:00'), 2], [new Date('2021-08-12T03:24:00'), 3]]));
        expect(user.removeRouteFromHistorical(new Date('2022-12-17T03:24:00'), 2)).to.be.true;
        expect(user.historical).to.be.eql(new Set<[Date, number]>([[new Date(), 4], [new Date('2021-08-12T03:24:00'), 3]]));
        //expect(user.removeActiveChallenge(new Date('2021-08-12T03:24:00'), new Route(3, ))).to.be.true;
        expect(user.historical).to.be.eql(new Set<[Date, number]>([[new Date(), 4]]));
        expect(user.removeRouteFromHistorical(new Date('2022-12-17T03:24:00'), 2)).to.be.false;
        //expect(user.removeActiveChallenge(new Date('2021-08-12T03:24:00'), new Route(3, ))).to.be.false;
    });
});
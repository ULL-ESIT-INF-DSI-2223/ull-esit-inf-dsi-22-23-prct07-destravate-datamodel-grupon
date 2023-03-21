import { Activities } from "./activities";
import { Statistics } from "./statistics";
import { Group } from "./group";
import { Challenge } from "./challenge";
import { Route } from "./route";

export class User {
    constructor(private _id: string, private _name: string, private _activity: Activities, private _friends: Set<string>, private _groups: Set<number>, private _statistics: Statistics, private _favourite_routes: Set<number>, private _active_challenges: Set<number>, private _historical: Set<[Date, number]>) {
        if (_friends.has(_id)) {
            throw "Un usuario no puede ser amigo de sí mismo";
        }
        _groups.forEach((id, index) => {
            if (id < 0 || id % 1 !== 0) {
                throw `ID ${id} del grupo ${index} no válido`;
            }
        });
        _favourite_routes.forEach((id, index) => {
            if (id < 0 || id % 1 !== 0) {
                throw `ID ${id} de la ruta ${index} no válido`;
            }
        });
        _active_challenges.forEach((id, index) => {
            if (id < 0 || id % 1 !== 0) {
                throw `ID ${id} del reto ${index} no válido`;
            }
        });
        _historical.forEach((element, index) => {
            if (element[0] > new Date()) {
                throw "La fecha de una ruta del historial no puede ser futura";
            }
            if (element[1] < 0 || element[1] % 1 !== 0) {
                throw `ID ${element[1]} de la ruta ${index} del historial no válido`;
            }
        })
    }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

    get activity(): Activities {
        return this._activity;
    }

    set activity(activity: Activities) {
        this._activity = activity;
    }

  get friends(): Set<string> {
    return this._friends;
  }

  set friends(friends: Set<string>) {
    if (friends.has(this._id)) {
      throw "Un usuario no puede ser amigo de sí mismo";
    }
    this._friends = friends;
  }

  public addFriend(friend: string | User): boolean {
    if (typeof friend === "string") {
      if (!this._friends.has(friend) && friend !== this.id) {
        this._friends.add(friend);
        return true;
      }
    } else {
      if (!this._friends.has(friend.id) && friend.id !== this.id) {
        this._friends.add(friend.id);
        return true;
      }
    }
    return false;
  }

  public removeFriend(friend: string | User): boolean {
    if (typeof friend === "string") {
      return this._friends.delete(friend);
    } else {
      return this._friends.delete(friend.id);
    }
  }

  get groups(): Set<number> {
    return this._groups;
  }

  set groups(groups: Set<number>) {
    groups.forEach((id, index) => {
      if (id < 0 || id % 1 !== 0) {
        throw `ID ${id} del grupo ${index} no válido`;
      }
    });
    this._groups = groups;
  }

  public addGroup(group: number | Group): boolean {
    if (typeof group === "number") {
      if (group >= 0 && group % 1 === 0 && !this._groups.has(group)) {
        this._groups.add(group);
        return true;
      }
    } else {
      if (group.id >= 0 && group.id % 1 === 0 && !this._groups.has(group.id)) {
        this._groups.add(group.id);
        return true;
      }
    }
    return false;
  }

  public removeGroup(group: number | Group): boolean {
    if (typeof group === "number") {
      return this._groups.delete(group);
    } else {
      return this._groups.delete(group.id);
    }
  }

    get statistics(): Statistics {
        return this._statistics;
    }
    
    set statistics(statistics: Statistics) {
        this._statistics = statistics;
    }

  get favourite_routes(): Set<number> {
    return this._favourite_routes;
  }

  set favourite_routes(favourite_routes: Set<number>) {
    favourite_routes.forEach((id, index) => {
      if (id < 0 || id % 1 !== 0) {
        throw `ID ${id} de la ruta ${index} no válido`;
      }
    });
    this._favourite_routes = favourite_routes;
  }

  public addFavouriteRoute(route: number | Route): boolean {
    if (typeof route === "number") {
      if (route >= 0 && route % 1 === 0 && !this._favourite_routes.has(route)) {
        this._favourite_routes.add(route);
        return true;
      }
    } else {
      if (
        route.id >= 0 &&
        route.id % 1 === 0 &&
        !this._favourite_routes.has(route.id)
      ) {
        this._favourite_routes.add(route.id);
        return true;
      }
    }
    return false;
  }

  public removeFavouriteRoute(route: number | Route): boolean {
    if (typeof route === "number") {
      return this._favourite_routes.delete(route);
    } else {
      return this._favourite_routes.delete(route.id);
    }
  }

  get active_challenges(): Set<number> {
    return this._active_challenges;
  }

  set active_challenges(active_challenges: Set<number>) {
    active_challenges.forEach((id, index) => {
      if (id < 0 || id % 1 !== 0) {
        throw `ID ${id} del reto ${index} no válido`;
      }
    });
    this._active_challenges = active_challenges;
  }

  public addActiveChallenge(challenge: number | Challenge): boolean {
    if (typeof challenge === "number") {
      if (
        challenge >= 0 &&
        challenge % 1 === 0 &&
        !this._active_challenges.has(challenge)
      ) {
        this._active_challenges.add(challenge);
        return true;
      }
    } else {
      if (
        challenge.id >= 0 &&
        challenge.id % 1 === 0 &&
        !this._active_challenges.has(challenge.id)
      ) {
        this._active_challenges.add(challenge.id);
        return true;
      }
    }
    return false;
  }

  public removeActiveChallenge(challenge: number | Challenge): boolean {
    if (typeof challenge === "number") {
      return this._active_challenges.delete(challenge);
    } else {
      return this._active_challenges.delete(challenge.id);
    }
  }

  get historical(): Set<[Date, number]> {
    return this._historical;
  }

  set historical(historical: Set<[Date, number]>) {
    historical.forEach((element, index) => {
      if (element[0] > new Date()) {
        throw "La fecha de una ruta del historial no puede ser futura";
      }
      if (element[1] < 0 || element[1] % 1 !== 0) {
        throw `ID ${element[1]} de la ruta ${index} del historial no válido`;
      }
    });
    this._historical = historical;
  }

    public addRouteToHistorical(date: Date, route: number | Route): boolean {
        if (typeof route === "number") {
            if (route >= 0 && route % 1 === 0 && date <= new Date()) {
                this._historical.add([date, route]);
                return true;
            }
        } else {
            if (route.id >= 0 && route.id % 1 === 0 && date <= new Date()) {
                this._historical.add([date, route]);
                return true;
            }
        }
        return false;
    }

  public removeRouteFromHistorical(date: Date, route: number | Route): boolean {
    if (typeof route === "number") {
      return this._historical.delete([date, route]);
    } else {
      return this._historical.delete([date, route.id]);
    }
  }
}

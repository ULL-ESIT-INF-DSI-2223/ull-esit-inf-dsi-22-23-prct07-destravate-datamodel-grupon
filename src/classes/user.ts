import { Activity } from "../types/activity";
import { Statistics } from "./statistics";
import { Group } from "./group";
import { Challenge } from "./challenge";
import { Route } from "./route";

export class User {
  private _id: string
  private _name: string
  private _activity: Activity
  private _friends: string[] = []
  private _groups: number[] = []
  private _statistics: Statistics
  private _favourite_routes: number[] = []
  private _active_challenges: number[] = []
  private _historical: [Date, number][] = []

  constructor(
    id: string,
    name: string,
    activity: Activity,
    friends: string[],
    groups: number[],
    statistics: Statistics,
    favourite_routes: number[],
    active_challenges: number[],
    historical: [Date, number][]
  ) {
    this._id = id;
    this._name = name;
    this._activity = activity;
    const friends_set = new Set(friends);
    friends_set.forEach((friend_id) => {
      if (friend_id === this.id) {
        throw new Error("Un usuario no puede ser amigo de sí mismo");
      } else {
        this._friends.push(friend_id);
      }
    });
    const groups_set = new Set(groups);
    groups_set.forEach((group_id) => {
      if (group_id < 0 || group_id % 1 !== 0) {
        throw new Error(`ID ${group_id} de grupo no válido`);
      } else {
        this._groups.push(group_id);
      }
    });
    this._statistics = statistics;
    const favourite_routes_set = new Set(favourite_routes);
    favourite_routes_set.forEach((route_id) => {
      if (route_id < 0 || route_id % 1 !== 0) {
        throw new Error(`ID ${route_id} de ruta no válido`);
      } else {
        this._favourite_routes.push(route_id);
      }
    });
    const active_challenges_set = new Set(active_challenges);
    active_challenges_set.forEach((challenge_id) => {
      if (challenge_id < 0 || challenge_id % 1 !== 0) {
        throw new Error(`ID ${challenge_id} de reto no válido`);
      } else {
        this._active_challenges.push(challenge_id);
      }
    });
    const historical_set = new Set(historical);
    historical_set.forEach((element) => {
      if (element[0] > new Date()) {
        throw new Error("La fecha de una ruta del historial no puede ser futura");
      }
      if (element[1] < 0 || element[1] % 1 !== 0) {
        throw new Error(`ID ${element[1]} de ruta del historial no válido`);
      } else {
        this._historical.push(element);
      }
    });
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

  get activity(): Activity {
    return this._activity;
  }

  set activity(activity: Activity) {
    this._activity = activity;
  }

  get friends(): string[] {
    return this._friends;
  }

  set friends(friends: string[]) {
    const friends_set = new Set(friends);
    const tmp = this._friends.splice(0);
    friends_set.forEach((id) => {
      if (id === this._id) {
        this._friends = tmp;
        throw new Error("Un usuario no puede ser amigo de sí mismo");
      } else {
        this._friends.push(id);
      }
    });
  }

  public addFriend(friend: string | User): boolean {
    if (typeof friend === "string") {
      if (!this._friends.includes(friend) && friend !== this.id) {
        this._friends.push(friend);
        return true;
      }
    } else {
      if (!this._friends.includes(friend.id) && friend.id !== this.id) {
        this._friends.push(friend.id);
        return true;
      }
    }
    return false;
  }

  public removeFriend(friend: string | User): boolean {
    let index: number;
    if (typeof friend === "string") {
      index = this._friends.indexOf(friend);
    } else {
      index = this._friends.indexOf(friend.id);
    }
    if (index > -1) {
      this._friends.splice(index, 1);
      return true;
    }
    return false
  }

  get groups(): number[] {
    return this._groups;
  }

  set groups(groups: number[]) {
    const groups_set = new Set(groups);
    const tmp = this._groups.splice(0);
    groups_set.forEach((id) => {
      if (id < 0 || id % 1 !== 0) {
        this._groups = tmp;
        throw new Error(`ID ${id} de grupo no válido`);
      } else {
        this._groups.push(id);
      }
    });
  }

  public addGroup(group: number | Group): boolean {
    if (typeof group === "number") {
      if (group >= 0 && group % 1 === 0 && !this._groups.includes(group)) {
        this._groups.push(group);
        return true;
      }
    } else {
      if (!this._groups.includes(group.id)) {
        this._groups.push(group.id);
        return true;
      }
    }
    return false;
  }

  public removeGroup(group: number | Group): boolean {
    let index: number;
    if (typeof group === "number") {
      index = this._groups.indexOf(group);
    } else {
      index = this._groups.indexOf(group.id);
    }
    if (index > -1) {
      this._groups.splice(index, 1);
      return true;
    }
    return false;
  }

  get statistics(): Statistics {
    return this._statistics;
  }

  set statistics(statistics: Statistics) {
    this._statistics = statistics;
  }

  get favourite_routes(): number[] {
    return this._favourite_routes;
  }

  set favourite_routes(favourite_routes: number[]) {
    const favourite_routes_set = new Set(favourite_routes);
    const tmp = this._favourite_routes.splice(0);
    favourite_routes_set.forEach((id) => {
      if (id < 0 || id % 1 !== 0) {
        this._favourite_routes = tmp;
        throw new Error(`ID ${id} de ruta no válido`);
      } else {
        this._favourite_routes.push(id);
      }
    });
  }

  public addFavouriteRoute(route: number | Route): boolean {
    if (typeof route === "number") {
      if (route >= 0 && route % 1 === 0 && !this._favourite_routes.includes(route)) {
        this._favourite_routes.push(route);
        return true;
      }
    } else {
      if (!this._favourite_routes.includes(route.id)) {
        this._favourite_routes.push(route.id);
        return true;
      }
    }
    return false;
  }

  public removeFavouriteRoute(route: number | Route): boolean {
    let index: number;
    if (typeof route === "number") {
      index = this._favourite_routes.indexOf(route);
    } else {
      index = this._favourite_routes.indexOf(route.id);
    }
    if (index > -1) {
      this._favourite_routes.splice(index, 1);
      return true;
    }
    return false
  }

  get active_challenges(): number[] {
    return this._active_challenges;
  }

  set active_challenges(active_challenges: number[]) {
    const active_challenges_set = new Set(active_challenges);
    const tmp = this._active_challenges.splice(0);
    active_challenges_set.forEach((id) => {
      if (id < 0 || id % 1 !== 0) {
        this._active_challenges = tmp;
        throw new Error(`ID ${id} de reto no válido`);
      } else {
        this._active_challenges.push(id);
      }
    });
  }

  public addActiveChallenge(challenge: number | Challenge): boolean {
    if (typeof challenge === "number") {
      if (challenge >= 0 && challenge % 1 === 0 && !this._active_challenges.includes(challenge)) {
        this._active_challenges.push(challenge);
        return true;
      }
    } else {
      if (!this._active_challenges.includes(challenge.id)) {
        this._active_challenges.push(challenge.id);
        return true;
      }
    }
    return false;
  }

  public removeActiveChallenge(challenge: number | Challenge): boolean {
    let index: number;
    if (typeof challenge === "number") {
      index = this._active_challenges.indexOf(challenge);
    } else {
      index = this._active_challenges.indexOf(challenge.id);
    }
    if (index > -1) {
      this._active_challenges.splice(index, 1);
      return true;
    }
    return false
  }

  get historical(): [Date, number][] {
    return this._historical;
  }

  set historical(historical: [Date, number][]) {
    const historical_set = new Set(historical);
    const tmp = this._historical.splice(0);
    historical_set.forEach((element) => {
      if (element[0] > new Date()) {
        this._historical = tmp;
        throw new Error("La fecha de una ruta del historial no puede ser futura");
      }
      if (element[1] < 0 || element[1] % 1 !== 0) {
        throw new Error(`ID ${element[1]} de ruta del historial no válido`);
      } else {
        this._historical.push(element);
      }
    });
  }

  public addRouteToHistorical(date: Date, route: number | Route): boolean {
    if (typeof route === "number") {
      if (route >= 0 && route % 1 === 0) {
        this._historical.push([date, route]);
        return true;
      }
    } else {
        this._historical.push([date, route.id]);
        return true;
    }
    return false;
  }

  public removeRouteFromHistorical(date: Date, route: number | Route): boolean {
    let index = -1;
    if (typeof route === "number") {
      this._historical.forEach((element, i) => {if (date.toDateString() === element[0].toDateString() && route === element[1]) {
        index = i;
      }})
    } else {
      this._historical.forEach((element, i) => {if (date.toDateString() === element[0].toDateString() && route.id === element[1]) {
        index = i;
      }})
    }
    if (index > -1) {
      this._historical.splice(index, 1);
      return true;
    }
    return false
  }
}

import { Activity } from "./types/activity";
import { User } from "./user";
import { Route } from "./route";

export class Challenge {
  constructor(
    private _id: number,
    private _name: string,
    private _routes: Set<number>,
    private _activity: Activity,
    private _total_kilometers: number,
    private _users: Set<string>
  ) {
    if (_id < 0 || _id % 1 !== 0) {
      throw "ID del reto no válido";
    }
    _routes.forEach((id) => {
      if (id < 0 || id % 1 !== 0) {
        throw `ID ${id} de ruta no válido`;
      }
    });
    if (_total_kilometers < 0) {
      throw "El total de kilómetros debe ser positivo";
    }
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    if (id < 0 || id % 1 !== 0) {
      throw "ID del reto no válido";
    }
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get routes(): Set<number> {
    return this._routes;
  }

  set routes(routes: Set<number>) {
    routes.forEach((id) => {
      if (id < 0 || id % 1 !== 0) {
        throw `ID ${id} de ruta no válido`;
      }
    });
    this._routes = routes;
  }

  public addRoute(route: number | Route): boolean {
    if (typeof route === "number") {
      if (route >= 0 && route % 1 === 0 && !this._routes.has(route)) {
        this._routes.add(route);
        return true;
      }
    } else {
      if (!this._routes.has(route.id)) {
        this._routes.add(route.id);
        return true;
      }
    }
    return false;
  }

  public removeRoute(route: number | Route): boolean {
    if (typeof route === "number") {
      return this._routes.delete(route);
    } else {
      return this._routes.delete(route.id);
    }
  }

  get activity(): Activity {
    return this._activity;
  }

  set activity(activity: Activity) {
    this._activity = activity;
  }

  get total_kilometers(): number {
    return this._total_kilometers;
  }

  set total_kilometers(total_kilometers: number) {
    if (total_kilometers < 0) {
      throw "El total de kilómetros debe ser positivo";
    }
    this._total_kilometers = total_kilometers;
  }

  get users(): Set<string> {
    return this._users;
  }

  set users(users: Set<string>) {
    this._users = users;
  }

  public addUser(user: string | User): boolean {
    if (typeof user === "string") {
      if (!this._users.has(user)) {
        this._users.add(user);
        return true;
      }
    } else {
      if (!this._users.has(user.id)) {
        this._users.add(user.id);
        return true;
      }
    }
    return false;
  }

  public removeUser(user: string | User): boolean {
    if (typeof user === "string") {
      return this._users.delete(user);
    } else {
      return this._users.delete(user.id);
    }
  }
}

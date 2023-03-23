import { Activity } from "./types/activity";
import { User } from "./user";
import { Route } from "./route";

export class Challenge {
  private _routes: number[] = []
  private _users: string[] = []
  
  constructor(
    private _id: number,
    private _name: string,
    routes: number[],
    private _activity: Activity,
    private _total_kilometers: number,
    users: string[]
  ) {
    if (_id < 0 || _id % 1 !== 0) {
      throw "ID del reto no válido";
    }
    const routes_set = new Set(routes);
    routes_set.forEach((id) => {
      if (id < 0 || id % 1 !== 0) {
        throw new Error(`ID ${id} de ruta no válido`);
      } else {
        this._routes.push(id);
      }
    });
    if (_total_kilometers < 0) {
      throw "El total de kilómetros debe ser positivo";
    }
    const users_set = new Set(users);
    users_set.forEach((id) => {
      this._users.push(id);
    });
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

  get routes(): number[] {
    return this._routes;
  }

  set routes(routes: number[]) {
    const routes_set = new Set(routes);
    const tmp = this._routes.splice(0);
    routes_set.forEach((id) => {
      if (id < 0 || id % 1 !== 0) {
        this._routes = tmp;
        throw new Error(`ID ${id} de ruta no válido`);
      } else {
        this._routes.push(id);
      }
    });
  }

  public addRoute(route: number | Route): boolean {
    if (typeof route === "number") {
      if (route >= 0 && route % 1 === 0 && !this._routes.includes(route)) {
        this._routes.push(route);
        return true;
      }
    } else {
      if (!this._routes.includes(route.id)) {
        this._routes.push(route.id);
        return true;
      }
    }
    return false;
  }

  public removeRoute(route: number | Route): boolean {
    let index: number;
    if (typeof route === "number") {
      index = this._routes.indexOf(route);
    } else {
      index = this._routes.indexOf(route.id);
    }
    if (index > -1) {
      this._routes.splice(index, 1);
      return true;
    }
    return false
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

  get users(): string[] {
    return this._users;
  }

  set users(users: string[]) {
    const users_set = new Set(users);
    users_set.forEach((id) => {
      this._users.push(id);
    });
  }

  public addUser(user: string | User): boolean {
    if (typeof user === "string") {
      if (!this._users.includes(user)) {
        this._users.push(user);
        return true;
      }
    } else {
      if (!this._users.includes(user.id)) {
        this._users.push(user.id);
        return true;
      }
    }
    return false;
  }

  public removeUser(user: string | User): boolean {
    let index: number;
    if (typeof user === "string") {
      index = this._users.indexOf(user);
    } else {
      index = this._users.indexOf(user.id);
    }
    if (index > -1) {
      this._users.splice(index, 1);
      return true;
    }
    return false
  }
}

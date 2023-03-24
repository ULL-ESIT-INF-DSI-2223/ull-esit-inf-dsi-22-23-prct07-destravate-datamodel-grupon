import { Activity } from "../types/activity";
import { User } from "./user";
import { Route } from "./route";
import { Stringable } from "../interfaces/stringable";

export class Challenge implements Stringable {
  private _id: number;
  private _name: string;
  private _routes: number[] = [];
  private _activity: Activity;
  private _total_kilometers: number;
  private _users: string[] = [];
  /**
   *
   * Constructor de la clase Challenge
   *
   * @param id ID del Challenge
   * @param name Nombre del Challenge
   * @param routes Rutas del Challenge
   * @param activity Actividad a realizar en el Challenge
   * @param total_kilometers Kilómetros totales del Challenge
   * @param users ID de usuarios que participan en el Challenge
   */
  constructor(
    id: number,
    name: string,
    routes: number[],
    activity: Activity,
    total_kilometers: number,
    users: string[]
  ) {
    if (id < 0 || id % 1 !== 0) {
      throw "ID del reto no válido";
    } else {
      this._id = id;
    }
    this._name = name;
    const routes_set = new Set(routes);
    routes_set.forEach((route_id) => {
      if (route_id < 0 || route_id % 1 !== 0) {
        throw new Error(`ID ${route_id} de ruta no válido`);
      } else {
        this._routes.push(route_id);
      }
    });
    this._activity = activity;
    if (total_kilometers < 0) {
      throw "El total de kilómetros debe ser positivo";
    } else {
      this._total_kilometers = total_kilometers;
    }
    const users_set = new Set(users);
    users_set.forEach((user_id) => {
      this._users.push(user_id);
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
  /**
   *
   * Función para añadir una ruta
   *
   * @param route ID de ruta o propio objeto
   * @returns true si se ha podido añadir false si no
   */
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

  /**
   *
   * Función para eliminar una ruta
   *
   * @param route ID de ruta o propio objeto
   * @returns true si se ha podido eliminar false si no
   */
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
    return false;
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
    this._users.splice(0);
    users_set.forEach((id) => {
      this._users.push(id);
    });
  }

  /**
   *
   * Función para añadir un id de usuario a un reto
   *
   * @param route ID de usuario o propio objeto
   * @returns true si se ha podido añadir false si no
   */
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

  /**
   *
   * Función para eliminar un id de usuario a un reto
   *
   * @param route ID de usuario o propio objeto
   * @returns true si se ha podido eliminar false si no
   */
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
    return false;
  }

  public toString(): string {
    let output = "";
    output += `ID: ${this.id}\n`;
    output += `Nombre: ${this.name}\n`;
    output += `Rutas: ${this.routes}\n`;
    output += `Actividad: ${this.activity}\n`;
    output += `Kilómetros totales: ${this.total_kilometers}\n`;
    output += `Usuarios: ${this.users}\n`;
    return output;
  }
}

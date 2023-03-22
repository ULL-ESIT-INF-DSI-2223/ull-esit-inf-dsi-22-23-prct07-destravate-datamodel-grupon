import { Route } from "./route";
import { Statistics } from "./statistics";
/**
 *
 * Clase que representa una ruta
 * Atributos
 *  id_ - ID único del grupo.
 *  name_ - Nombre del grupo.
 *  participants_ids_ - Colleción de IDs de usuarios miembros del grupo.
 *
 */
export class Group {
  constructor(
    private _id: number,
    private _name: string,
    private _members_id: string[],
    private _statistics: Statistics,
    private _favourite_routes: Set<number>,
    private _historical: Set<[Date, number]>
  ) {
    if (_id < 0 || _id % 1 !== 0) {
      throw `ID de Grupo no válido`;
    }
    _historical.forEach((element) => {
      if (element[0] > new Date()) {
        throw "La fecha de una ruta del historial no puede ser futura";
      }
      if (element[1] < 0 || element[1] % 1 !== 0) {
        throw `ID ${element[1]} de ruta del historial no válido`;
      }
    });
  }

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    if (id < 0 || id % 1 !== 0) {
      throw `ID de Grupo no válido`;
    }
    this._id = id;
  }
  public get name(): string {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }
  public get members_id(): string[] {
    return this._members_id;
  }
  public set members_id(members_id: string[]) {
    this._members_id = members_id;
  }

  public get statistics(): Statistics {
    return this._statistics;
  }

  public set statistics(statistics: Statistics) {
    this._statistics = statistics;
  }

  get favourite_routes(): Set<number> {
    return this._favourite_routes;
  }

  set favourite_routes(favourite_routes: Set<number>) {
    favourite_routes.forEach((id) => {
      if (id < 0 || id % 1 !== 0) {
        throw `ID ${id} de ruta no válido`;
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
      if (!this._favourite_routes.has(route.id)) {
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

  get historical(): Set<[Date, number]> {
    return this._historical;
  }

  set historical(historical: Set<[Date, number]>) {
    historical.forEach((element) => {
      if (element[0] > new Date()) {
        throw "La fecha de una ruta del historial no puede ser futura";
      }
      if (element[1] < 0 || element[1] % 1 !== 0) {
        throw `ID ${element[1]} de ruta del historial no válido`;
      }
    });
    this._historical = historical;
  }
}

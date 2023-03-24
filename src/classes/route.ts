import { Coord } from "./coord";
import { Activity } from "../types/activity";
import { User } from "./user";

/**
 *
 * Clase que representa una ruta
 * Atributos
 *  id_ - ID único de la ruta.
 *  name_ - Nombre de la ruta.
 *  ini_cords_ - Geolocalización del inicio (coordenadas).
 *  end_cords_ - Geolocalización del final de la ruta (coordenadas).
 *  length_ - Longitud de la ruta en kilómetros.
 *  average_slope_ - Desnivel medio de la ruta.
 *  visitors_id_ - Usuarios que han realizado la ruta (IDs).
 *  activity_ - Tipo de actividad: Indicador si la ruta se puede realizar en bicicleta o corriendo.
 *  avg_score_ - Calificación media de la ruta.
 *
 */
export class Route {
  private _id: number;
  private _name: string;
  private _ini_cords: Coord;
  private _end_cords: Coord;
  private _length: number;
  private _average_slope: number;
  private _visitors_id: string[];
  private _activity: Activity;
  private _avg_score: number;

  constructor(
    id: number,
    name: string,
    ini_cords: Coord,
    end_cords: Coord,
    length: number,
    average_slope: number,
    visitors_id: string[],
    activity: Activity,
    avg_score: number
  ) {
    if (id < 0 || id % 1 !== 0) {
      throw new Error(`ID de ruta no válido`);
    }
    this._id = id;
    this._name = name;
    this._ini_cords = ini_cords;
    this._end_cords = end_cords;
    if (length < 0) {
      throw new Error(`Longitud no válida`);
    }
    this._length = length;
    if (average_slope < 0) {
      throw new Error(`Pendiente media no válida`);
    }
    this._average_slope = average_slope;
    this._visitors_id = visitors_id;
    this._activity = activity;
    if (avg_score < 0) {
      throw new Error(`Puntuación media no válida`);
    }
    this._avg_score = avg_score;
  }

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    if (id < 0 || id % 1 !== 0) {
      throw new Error(`ID de ruta no válido`);
    }
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  public get ini_cords(): Coord {
    return this._ini_cords;
  }
  public set ini_cords(ini_cords: Coord) {
    this._ini_cords = ini_cords;
  }

  public get end_cords(): Coord {
    return this._end_cords;
  }
  public set end_cords(end_cords: Coord) {
    this._end_cords = end_cords;
  }

  public get length(): number {
    return this._length;
  }
  public set length(length: number) {
    if (length < 0) {
      throw new Error(`Longitud no válida`);
    }
    this._length = length;
  }

  public get average_slope(): number {
    return this._average_slope;
  }
  public set average_slope(average_slope: number) {
    if (average_slope < 0) {
      throw new Error(`Pendiente media no válida`);
    }
    this._average_slope = average_slope;
  }

  public get visitors_id(): string[] {
    return this._visitors_id;
  }
  public set visitors_id(visitors_id: string[]) {
    this._visitors_id = visitors_id;
  }

  public get activity(): Activity {
    return this._activity;
  }
  public set activity(activity: Activity) {
    this._activity = activity;
  }

  public get avg_score(): number {
    return this._avg_score;
  }
  public set avg_score(avg_score: number) {
    if (avg_score < 0) {
      throw new Error(`Puntuación media no válida`);
    }
    this._avg_score = avg_score;
  }

  /**
   *
   * @param visitor Id del usuario que a visitado o el propio usuario
   * @returns Verdadero si se pudo
   */
  public addVisitor(visitor: string | User): boolean {
    if (typeof visitor === "string") {
      if (!this._visitors_id.includes(visitor)) {
        this._visitors_id.push(visitor);
        return true;
      }
    } else {
      if (!this._visitors_id.includes(visitor.id)) {
        this._visitors_id.push(visitor.id);
        return true;
      }
    }
    return false;
  }
  public toString(): string {
    let output = `ID del ruta: ${this._id}\n`;
    output += `Nombre del ruta: ${this._name}\n`;
    output += `ID que han visitado la ruta: ${this._visitors_id}\n`;
    output += `Coordenadas de inicio: ${this._ini_cords.toString()}\n`;
    output += `Coordenadas de finalización: ${this._end_cords.toString()}\n`;
    output += `Longitud de la ruta: ${this._length}\n`;
    output += `Desnivel medio de la ruta: ${this._average_slope}\n`;
    output += `Actividad de la ruta: ${this._activity}\n`;
    output += `Puntuación media de la ruta: ${this._avg_score}\n`;
    return output;
  }
}

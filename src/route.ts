import { Cords } from "./types/Cords";
import { Activity } from "./types/Activity";

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
  constructor(
    private id_: number,
    private name_: string,
    private ini_cords_: Cords,
    private end_cords_: Cords,
    private length_: number,
    private average_slope_: number,
    private visitors_id_: number[],
    private activity_: Activity,
    private avg_score_: number
  ) {}

  public get id(): number {
    return this.id_;
  }
  public get name(): string {
    return this.name_;
  }
  public get ini_cords(): Cords {
    return this.ini_cords_;
  }
  public get end_cords(): Cords {
    return this.end_cords_;
  }
  public get length(): number {
    return this.length_;
  }
  public get average_slope(): number {
    return this.average_slope_;
  }
  public get visitors_id(): number[] {
    return this.visitors_id_;
  }
  public get activity(): Activity {
    return this.activity_;
  }
  public get avg_score(): number {
    return this.avg_score_;
  }
}

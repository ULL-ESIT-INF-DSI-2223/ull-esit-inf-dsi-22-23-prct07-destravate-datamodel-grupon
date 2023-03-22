/**
 *
 * Clase para representar una coordenada con longitud y latitud
 *
 * Atributos:
 *      _longitude: longitud de la cordenada
 *      _latitude
 */
export class Coord {
  private _latitude: number;
  private _longitude: number;

  constructor(latitude: number, longitude: number) {
    if (latitude < -90 || latitude > 90) throw "Latitud fuera de rango";
    this._latitude = latitude;
    if (longitude < -180 || longitude > 180) throw "Longitud fuera de rango";
    this._longitude = longitude;
  }

  public get longitude(): number {
    return this._longitude;
  }

  public set longitude(longitude: number) {
    if (longitude < -180 || longitude > 180) throw "Longitud fuera de rango";
    this._longitude = longitude;
  }

  public get latitude(): number {
    return this._latitude;
  }

  public set latitude(latitude: number) {
    if (latitude < -90 || latitude > 90) throw "Latitud fuera de rango";
    this._latitude = latitude;
  }

  public toString(): string {
    return `(${this._latitude}, ${this._longitude})`;
  }
}

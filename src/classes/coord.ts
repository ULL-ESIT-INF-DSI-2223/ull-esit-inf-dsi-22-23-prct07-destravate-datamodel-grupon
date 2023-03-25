export class Coord {
  private _latitude: number;
  private _longitude: number;

  /**
   *
   * Constructor de la clase Coord que representa una coordenada
   *
   * @param latitude Latitud. Debe estar entre -90 y 90.
   * @param longitude Longitud. Debe estar entre -90 y 90.
   */
  constructor(latitude: number, longitude: number) {
    if (latitude < -90 || latitude > 90)
      throw new Error("Latitud fuera de rango");
    this._latitude = latitude;
    if (longitude < -180 || longitude > 180)
      throw new Error("Longitud fuera de rango");
    this._longitude = longitude;
  }

  public get longitude(): number {
    return this._longitude;
  }

  public set longitude(longitude: number) {
    if (longitude < -180 || longitude > 180)
      throw new Error("Longitud fuera de rango");
    this._longitude = longitude;
  }

  public get latitude(): number {
    return this._latitude;
  }

  public set latitude(latitude: number) {
    if (latitude < -90 || latitude > 90)
      throw new Error("Latitud fuera de rango");
    this._latitude = latitude;
  }

  /**
   *
   * Devuelve la información de la coordenada en forma de cadena
   *
   * @returns Cadena con la información de la coordenada
   */
  public toString(): string {
    return `(${this._latitude}, ${this._longitude})`;
  }
}

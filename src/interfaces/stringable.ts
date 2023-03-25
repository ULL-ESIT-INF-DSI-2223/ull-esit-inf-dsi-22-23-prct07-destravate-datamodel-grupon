/**
 * Interfaz para obligar que un elemento tenga la función print
 */
export interface Stringable {
  /**
   *
   * Devuelve la información de un objeto en forma de cadena
   *
   * @returns Cadena con la información del objeto
   */
  toString(): string;
}

import { Stringable } from "../interfaces/stringable";
import { Collectable } from "../interfaces/collectable";

export class Collection<T extends Stringable & { id: U }, U>
  implements Collectable<T, U>, Stringable
{
  protected _elements: T[] = [];

  /**
   *
   * Constructor de la clase Collection que representa una colección
   *
   * @param elements Elementos de la colección. No pueden haber varios elementos con el mismo ID
   */
  constructor(elements: T[]) {
    const elements_id_set = new Set<U>();
    elements.forEach((element) => {
      elements_id_set.add(element.id);
    });
    if (elements_id_set.size !== elements.length) {
      throw new Error("Se han introducido dos elementos con el mismo ID");
    }
    this._elements = elements;
  }

  get elements(): T[] {
    return this._elements;
  }

  /**
   *
   * Añade un elemento a la colección
   *
   * @param element Elemento a añadir
   * @returns true si el elemento se pudo añadir, false si un elemento con el mismo ID ya estaba guardado
   */
  public add(element: T): boolean {
    if (!this.hasID(element.id)) {
      this._elements.push(element);
      return true;
    }
    return false;
  }

  /**
   *
   * Actualiza un elemento de la colección
   *
   * @param element Elemento a actualizar
   * @returns true si el elemento se pudo actualizar, false si el elemento no existe
   */
  public update(element: T): boolean {
    if (this.remove(element.id)) {
      this._elements.push(element);
      return true;
    }
    return false;
  }

  /**
   *
   * Elimina un elemento de la colección por su ID
   *
   * @param id ID del elemento a eliminar
   * @returns true si el elemento se pudo eliminar, false si el elemento no estaba guardado
   */
  public remove(id: U): boolean {
    let index = -1;
    this._elements.forEach((e, i) => {
      if (id === e.id) {
        index = i;
      }
    });
    if (index > -1) {
      this._elements.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   *
   * Devuelve un elemento de la colección
   *
   * @param index Índice del elemento a devolver
   * @returns Elemento en la posición introducida, undefined si el índice es inválido
   */
  public get(index: number): T | undefined {
    if (index >= 0 && index < this.length()) {
      return this._elements[index];
    }
    return undefined;
  }

  /**
   *
   * Devuelve el número de elementos de la colección
   *
   * @returns Número de elementos de la colección
   */
  public length(): number {
    return this._elements.length;
  }

  /**
   *
   * Comprueba si existe algún elemento con el ID introducido en la colección
   *
   * @param id_check ID a comprobar
   * @returns true si existe un elemento con el mismo ID, false en caso contrario
   */
  public hasID(id_check: U): boolean {
    let result = false;
    this._elements.forEach((element) => {
      if (element.id === id_check) {
        result = true;
      }
    });
    return result;
  }

  /**
   *
   *  Devuelve un elemento de la colección por su ID
   *
   * @param id_check ID del elemento a buscar
   * @returns El elemento con el ID si existe, undefined en caso contrario
   */
  public getByID(id_check: U): T | undefined {
    let result: T | undefined = undefined;
    this._elements.forEach((element) => {
      if (element.id === id_check) {
        result = element;
      }
    });
    return result;
  }

  /**
   *
   * Devuelve los elementos de la colección en forma de cadena
   *
   * @returns Cadena con la información de los elementos de la colección
   */
  public toString(): string {
    let output = "";
    for (let i = 0; i < this._elements.length; i++) {
      output += "--------------------\n";
      output += `${this._elements[i].toString()}\n`;
    }
    output += "--------------------\n";
    return output;
  }
}

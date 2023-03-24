import { Stringable } from "../interfaces/stringable";
import { Collectable } from "../interfaces/collectable";

export class Collection<T extends Stringable & { id: U }, U>
  implements Collectable<T, U>, Stringable
{
  protected _elements: T[] = [];

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

  public add(element: T): boolean {
    let repeated = false;
    this._elements.forEach((e) => {
      if (element.id === e.id) {
        repeated = true;
      }
    });
    if (!repeated) {
      this._elements.push(element);
      return true;
    }
    return false;
  }

  public update(element: T): boolean {
    if (this.remove(element.id)) {
      this._elements.push(element);
      return true;
    }
    return false;
  }

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

  public get(index: number): T | undefined {
    if (index >= 0 && index < this.length()) {
      return this._elements[index];
    }
    return undefined;
  }

  public length(): number {
    return this._elements.length;
  }

  public toString(): string {
    let output = "";
    this._elements.forEach((element) => {
      output += `${element.toString()}\n`;
    });
    return output;
  }
}

import { Challenge } from "../classes/challenge";
import { Collection } from "./collection";

export class ChallengeCollection extends Collection<Challenge, number> {
  /**
   *
   * Constructor de la clase ChallengeCollection que representa una colección de retos
   *
   * @param elements Retos de la colección. No pueden haber varios retos con el mismo ID
   */
  constructor(elements: Challenge[]) {
    super(elements);
  }

  /**
   *
   * Ordena los retos alfabéticamente por el nombre en orden ascendente
   *
   */
  public sortByName(): void {
    this._elements.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  /**
   *
   * Ordena los retos alfabéticamente por el nombre en orden descendente
   *
   */
  public sortReversedByName(): void {
    this.sortByName();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los retos por el total de kilómetros en orden ascendente
   *
   */
  public sortByKilometers(): void {
    this._elements.sort((a, b) =>
      a.total_kilometers > b.total_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los retos por el total de kilómetros en orden descendente
   *
   */
  public sortReversedByKilometers(): void {
    this.sortByKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los retos por el total de usuarios realizándolo en orden ascendente
   *
   */
  public sortByTotalUsers(): void {
    this._elements.sort((a, b) => (a.users.length > b.users.length ? 1 : -1));
  }

  /**
   *
   * Ordena los retos por el total de usuarios realizándolo en orden descendente
   *
   */
  public sortReversedByTotalUsers(): void {
    this.sortByTotalUsers();
    this._elements.reverse();
  }
}

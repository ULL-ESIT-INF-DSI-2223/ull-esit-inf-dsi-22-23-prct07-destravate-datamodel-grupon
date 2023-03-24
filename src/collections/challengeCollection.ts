import { Challenge } from "../classes/challenge";
import { Collection } from "./collection";

export class ChallengeCollection extends Collection<Challenge, number> {
  constructor(elements: Challenge[]) {
    super(elements);
  }
  /**
   *
   * Ordena los elementos alfabeticamente
   *
   */
  public sortByName(): void {
    this._elements.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedByName(): void {
    this.sortByName();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos alfabeticamente
   *
   */
  public sortByKilometers(): void {
    this._elements.sort((a, b) =>
      a.total_kilometers > b.total_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedByKilometers(): void {
    this.sortByKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos alfabeticamente
   *
   */
  public sortByTotalUsers(): void {
    this._elements.sort((a, b) => (a.users.length > b.users.length ? 1 : -1));
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedByTotalUsers(): void {
    this.sortByTotalUsers();
    this._elements.reverse();
  }
}

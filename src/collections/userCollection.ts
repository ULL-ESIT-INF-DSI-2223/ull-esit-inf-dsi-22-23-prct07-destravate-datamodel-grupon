import { User } from "../classes/user";
import { Collection } from "./collection";

export class UserCollection extends Collection<User, string> {
  constructor(elements: User[]) {
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
  public sortByWeekKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.week_kilometers > b.statistics.week_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedWeekKilometers(): void {
    this.sortByWeekKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos alfabeticamente
   *
   */
  public sortByMonthKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.month_kilometers > b.statistics.month_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedMonthKilometers(): void {
    this.sortByMonthKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos alfabeticamente
   *
   */
  public sortByYearKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.year_kilometers > b.statistics.year_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedYearKilometers(): void {
    this.sortByYearKilometers();
    this._elements.reverse();
  }
}

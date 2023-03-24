import { Group } from "../classes/group";
import { Collection } from "./collection";

/**
 * Colección de rutas
 */
export class GroupCollection extends Collection<Group, number> {
  constructor(elements: Group[]) {
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
  public sortByTotalWeekKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.week_kilometers > b.statistics.week_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedTotalWeekKilometers(): void {
    this.sortByTotalWeekKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos alfabeticamente
   *
   */
  public sortByTotalMonthKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.month_kilometers > b.statistics.month_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedTotalMonthKilometers(): void {
    this.sortByTotalMonthKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos alfabeticamente
   *
   */
  public sortByTotalYearKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.year_kilometers > b.statistics.year_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedTotalYearKilometers(): void {
    this.sortByTotalYearKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos segun el número de visitantes de menor a mayor
   *
   */
  public sortByNumberOfMembers(): void {
    this._elements.sort((a, b) =>
      a.members_id.length > b.members_id.length ? 1 : -1
    );
  }

  /**
   *
   * Ordena los elementos segun el número de visitantes de mayor a menor
   *
   */
  public sortReversedByNumberOfMembers(): void {
    this.sortByNumberOfMembers();
    this._elements.reverse();
  }
}

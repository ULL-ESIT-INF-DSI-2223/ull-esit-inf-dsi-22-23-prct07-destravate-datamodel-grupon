import { User } from "../classes/user";
import { Collection } from "./collection";

export class UserCollection extends Collection<User, string> {
  /**
   *
   * Constructor de la clase UserCollection que representa una colección de usuarios
   *
   * @param elements Usuarios de la colección. No pueden haber varios usuarios con el mismo ID
   */
  constructor(elements: User[]) {
    super(elements);
  }

  /**
   *
   * Ordena los usuarios alfabéticamente por el nombre en orden ascendente
   *
   */
  public sortByName(): void {
    this._elements.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  /**
   *
   * Ordena los usuarios alfabéticamente por el nombre en orden descendente
   *
   */
  public sortReversedByName(): void {
    this.sortByName();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los usuarios por el total de kilómetros recorridos en la semana en orden ascendente
   *
   */
  public sortByWeekKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.week_kilometers > b.statistics.week_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los usuarios por el total de kilómetros recorridos en la semana en orden descendente
   *
   */
  public sortReversedWeekKilometers(): void {
    this.sortByWeekKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los usuarios por el total de kilómetros recorridos en el mes en orden ascendente
   *
   */
  public sortByMonthKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.month_kilometers > b.statistics.month_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los usuarios por el total de kilómetros recorridos en el mes en orden descendente
   *
   */
  public sortReversedMonthKilometers(): void {
    this.sortByMonthKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los usuarios por el total de kilómetros recorridos en el año en orden ascendente
   *
   */
  public sortByYearKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.year_kilometers > b.statistics.year_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los usuarios por el total de kilómetros recorridos en el año en orden descendente
   *
   */
  public sortReversedYearKilometers(): void {
    this.sortByYearKilometers();
    this._elements.reverse();
  }
}
